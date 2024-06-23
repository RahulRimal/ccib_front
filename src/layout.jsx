import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";

export const NoLayout = () => {
    return (
      <>
        {<Outlet />}
      </>
    );
  };

export  const DashboardLayout = ( { drawerWidth, toggleDrawer, toggleTheme }) => {
    return (
      <>
        <AppBar
          drawerWidth={drawerWidth}
          toggleDrawer={toggleDrawer}
          toggleTheme={toggleTheme}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `${drawerWidth}px calc(100% - ${drawerWidth}px)`,
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ maxWidth: drawerWidth }}>
            <Drawer drawerWidth={drawerWidth} />
          </div>
          <div style={{ maxWidth: "100%", margin: "12px", marginBottom: 0 }}>
            {<Outlet />}
          </div>
        </div>
      </>
    );
  };
