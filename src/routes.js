import Dashboard from "views/dashboard/Dashboard.js";
import Earn from "views/Earn/Earn";
import Stats from "views/Stats/Stats";
import Farm from "views/Farm/Farm";

import Initialmint from "views/initialmint/Initialmint.js";
import Mintredeem from "views/Mintredeem/Mintredeem";





var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/earn",
    name: "Earn",
    component: Earn,
    layout: "/admin",
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats,
    layout: "/admin",
  },
  {
    path: "/farm",
    name: "Farm",
    component: Farm,
    layout: "/admin",
  },
{
    path: "/initialmint",
    name: "Initial Mint",
    component: Initialmint,
    layout: "/admin",
  },
  
  {
    path: "/mintredeem",
    name: "Mint/Redeem",
    component: Mintredeem,
    layout: "/admin",
  }





];
export default routes;
