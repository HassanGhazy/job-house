const routes = [
  {
    path: ["/"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/browse-job","/browse"],
    exact: true,
    component: "browseJob",
  },
  {
    path: ["/candidate-profile/:id?"],
    exact: true,
    component: "candidate/candidate-profile",
  },
  {
    path: ["/company-profile/:id?"],
    exact: true,
    component: "company/company-profile",
  },
  {
    path: ["/:compId?/job-profile/:id?"],
    exact: true,
    component: "job/job-profile",
  },
  // {
  //   path: ["*"],
  //   exact: true,
  //   component: "Home",
  // },
];

export default routes;
