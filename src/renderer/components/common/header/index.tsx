import React, { useState } from "react";
import {
	MinusOutlined,
	BorderOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import { IpcEvents } from "@/ipcEvents";
import "./index.scss";

const Header = () => {
	async function handleHideWin() {
		window.electronAPI?.ipcRenderer.send(IpcEvents.EV_HIDE_MAIN_WIN);
	}

	function handleCloseWin() {
		window.electronAPI?.ipcRenderer.send(IpcEvents.EV_CLOSE_MAIN_WIN);
	}

	return (
		<div className="header">
			<div className="left">
				<span>REC</span>
			</div>
			<div className="drgan"></div>
			<div className="right">
				<MinusOutlined className="icon-s" onClick={handleHideWin} />
				<CloseOutlined className="icon-s" onClick={handleCloseWin} />
			</div>
		</div>
	);
};

export default Header;