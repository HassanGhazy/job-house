const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/browse-job","/browse"],
    exact: true,
    component: "browseJob",
  },
  {
    path: ["/candidate-profile"],
    exact: true,
    component: "candidate-profile",
  },
  {
    path: ["/company-profile"],
    exact: true,
    component: "company-profile",
  },
];

export default routes;
