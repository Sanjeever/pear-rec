import { app, screen, BrowserWindow, shell, ipcMain } from "electron";
import { PUBLIC, DIST } from "./utils";
import { join } from "node:path";
import { update } from "./update";

const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(DIST, "index.html");

let mainWin: BrowserWindow | null = null;

const createMainWin = (): BrowserWindow => {
	mainWin = new BrowserWindow({
		title: "Main window",
		icon: join(PUBLIC, "logo@2x.ico"),
		webPreferences: {
			preload,
			// Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
			// Consider using contextBridge.exposeInMainWorld
			// Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (url) {
		// electron-vite-vue#298
		mainWin.loadURL(url);
		// Open devTool if the app is not packaged
		mainWin.webContents.openDevTools();
	} else {
		mainWin.loadFile(indexHtml);
	}

	// Test actively push message to the Electron-Renderer
	mainWin.webContents.on("did-finish-load", () => {
		mainWin!.webContents.send(
			"main-process-message",
			new Date().toLocaleString(),
		);
	});

	// Make all links open with the browser, not with the application
	mainWin.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith("https:")) shell.openExternal(url);
		return { action: "deny" };
	});

	// Apply electron-updater
	update(mainWin);

	return mainWin;
};

function closeMainWin() {
	mainWin!.close();
	mainWin = null;
}

function openMainWin() {
	mainWin = createMainWin();
	mainWin!.show();
}

function showMainWin() {
	mainWin!.show();
}

function hideMainWin() {
	mainWin!.hide();
}

function minimizeMainWin() {
	mainWin!.minimize();
}

function maximizeMainWin() {
	mainWin!.maximize();
}

function unmaximizeMainWin() {
	mainWin!.unmaximize();
}

function focusMainWin() {
	if (mainWin) {
		// Focus on the main window if the user tried to open another
		if (mainWin.isMinimized()) mainWin.restore();
		mainWin.focus();
	}
}

export {
	mainWin,
	createMainWin,
	closeMainWin,
	openMainWin,
	hideMainWin,
	showMainWin,
	focusMainWin,
	minimizeMainWin,
};