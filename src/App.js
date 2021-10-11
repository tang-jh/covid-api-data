// import "./App.css";
// import React, { useState, useEffect } from "react";
// import Infoboard from "./Components/Infoboard";
// import { Route, Router, Switch } from "react-router";
// import Landing from "./Components/Landing";
// import Layout from "./Components/Layout";

// const CASES = "cases";
// // const HISTORY = "history";
// // const VACCINES = "vaccines";

// function App() {
//   const COVID_API = `https://covid-api.mmediagroup.fr/v1/`;
//   // const category = [CASES, HISTORY, VACCINES];

//   const [status, setStatus] = useState("idle");
//   const [appdata, setAppData] = useState(["Fetching country list"]);

//   useEffect(() => {
//     const fetchData = (async () => {
//       setStatus("pending");
//       try {
//         const res = await fetch(`${COVID_API}${CASES}`);
//         const json = await res.json();
//         setAppData(json);
//       } catch (error) {
//         setStatus("error");
//       }
//     })();
//   }, []);

//   return (
//     <div className="App">
//       <Layout appdata={appdata}>
//         <Router>
//           <Switch>
//             <Route exact path="/">
//               <Landing />
//             </Route>
//             {/* <Route path="/:country">
//               <Infoboard />
//             </Route> */}
//           </Switch>
//         </Router>
//       </Layout>

//       {/* <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         anchor="left"
//         classes={{ paper: classes.drawerPaper }}
//       >
//         <div>
//           <Typography variant="h5"> List of Countries</Typography>
//         </div>
//         <Sidebar items={appdata} />
//       </Drawer>
//       <Infoboard /> */}

//       {/* <Grid container justifyContent="center" spacing={2}>
//           <Grid item>
//             <h1>COVID-19 API Data</h1>
//           </Grid>
//         </Grid>
//         <Grid
//           container
//           spacing={1}
//           justifyContent="flex-start"
//         >
//           <Grid item s={3} sx={{maxHeight: 800}}>
//             <Sidebar items={appdata} />
//           </Grid>
//           <Grid item s={9}>
//             <Map />
//             <Infocard />
//             <Chart />
//           </Grid>
//         </Grid> */}

//       {/* <Grid container spacing={1}>
//           <Grid item xs={2}>
//             <Sidebar items={appdata} />
//           </Grid>
//           <Grid item s={10}>
//             <Grid container spacing={2}>
//               <Grid item xs={10}>
//                 <Map />
//                 <Infocard />
//                 <Chart />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid> */}
//     </div>
//   );
// }

// export default App;

import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import Infoboard from "./Components/Infoboard";
import Landing from "./Components/Landing";
import Layout from "./Components/Layout";

const COVID_API = `https://covid-api.mmediagroup.fr/v1/`;
const CASES = "cases";

const App = () => {
  const [status, setStatus] = useState("idle");
  const [appdata, setAppData] = useState({});

  useEffect(() => {
    const fetchData = (async () => {
      setStatus("pending");
      try {
        const res = await fetch(`${COVID_API}${CASES}`);
        const json = await res.json();
        setAppData(json);
      } catch (error) {
        setStatus("error");
      }
    })();
  }, []);

  return (
    <div className="App">
      <Layout appdata={appdata}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/country/:abbr">
            <Infoboard />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
