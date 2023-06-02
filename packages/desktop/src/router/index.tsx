import type { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/stores";
import "./index.scss";

import Home from "@/pages/home";
import ShotScreen from "@/pages/shotScreen";
import RecorderScreen from "@/pages/recorderScreen";
import RecordVideo from "@/pages/recorderVideo";
import RecordAudio from "@/pages/recorderAudio";
import ViewImage from "@/pages/viewImage";
import ViewVideo from "@/pages/viewVideo";
import Setting from "@/pages/setting";

const App: FC = () => (
	<Provider store={store}>
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/shotScreen" element={<ShotScreen />}></Route>
				<Route path="/RecorderScreen" element={<RecorderScreen />}></Route>
				<Route path="/recorderVideo" element={<RecordVideo />}></Route>
				<Route path="/recorderAudio" element={<RecordAudio />}></Route>
				<Route path="/viewImage" element={<ViewImage />}></Route>
				<Route path="/viewVideo" element={<ViewVideo />}></Route>
				<Route path="/setting" element={<Setting />}></Route>
			</Routes>
		</div>
	</Provider>
);

export default App;