const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	// eslint-disable-line global-require
	app.quit();
}

let tray;
let isQuitting;
let mainWindow;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		resizable: false, // do not resize
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, "index.html"));

	// hide menu on top
	mainWindow.setMenu(Menu());

	// prevent window from closing if closed
	mainWindow.on("close", function (e) {
		if (!isQuitting) {
			// prevent window from closing
			e.preventDefault();
			mainWindow.hide();
		}
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// destroy tray before exiting app
app.on("before-quit", function (evt) {
	tray.destroy();
});

// create custom tray icon
app.whenReady().then(() => {
	tray = new Tray(path.join(__dirname, "icon.png"));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Quit",
			type: "normal",
			click: function () {
				isQuitting = true;
				app.quit();
			},
		},
	]);
	tray.setToolTip("Sample Demo");
	tray.setContextMenu(contextMenu);

	tray.on("click", (e) => {
		mainWindow.show();
	});
});
