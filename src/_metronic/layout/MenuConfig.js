export default {
  header: {
    self: {},
    items: [
      {
        title: "Dashboards",
        root: true,
        alignment: "left",
        page: "dashboard",
        translate: "MENU.DASHBOARD"
      },
      {
        title: "Jobs",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "jobs"
      },
      {
        title: "Applications",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "applications"
      },
      {
        title: "New Job",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "jobs/new"
      },
      {
        title: "Interviews",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "interviews"
      },
      {
        title: "Tests",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "tests"
      }
    ]
  },
  aside: {
    self: {},
    items: [
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      {
        title: "Jobs",
        root: true,
        icon: "flaticon2-expand",
        page: "jobs"
      },
      {
        title: "Interviews",
        root: true,
        icon: "flaticon2-expand",
        page: "interviews"
      },
      {
        title: "Applications",
        root: true,
        icon: "flaticon2-expand",
        page: "applicaions"
      },
      {
        title: "Tests",
        root: true,
        icon: "flaticon2-expand",
        page: "tests"
      }
    ]
  }
};
