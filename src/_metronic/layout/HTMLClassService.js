import objectPath from "object-path";

export default class HtmlClassService {
  // Public properties
  config;
  classes;
  attributes;

  /**
   * Build html element classes from layout config
   * @param layoutConfig
   */
  setConfig(layoutConfig) {
    this.config = layoutConfig;

    // scope list of classes
    this.classes = {
      header: [],
      header_container: [],
      header_mobile: [],
      header_menu: [],
      aside: [],
      aside_menu: [],
      subheader: [],
      subheader_container: [],
      content: [],
      content_container: [],
      footer_container: []
    };

    this.attributes = {
      aside_menu: {},
      header_mobile: {},
      header: {},
      header_menu: {}
    };

    // init base layout
    this.initLayout();
    this.initLoader();

    // not yet implemented
    // this.initAsideSecondary();

    // init header and subheader menu
    this.initHeader();
    this.initSubheader();

    this.initContent();
    // init aside and aside menu
    this.initAside();

    // init footer
    this.initFooter();
  }

  /**
   * Returns Classes
   *
   * @param path: string
   * @param toString boolean
   */
  getClasses(path, toString) {
    if (path) {
      const classes = objectPath.get(this.classes, path) || "";
      if (toString && Array.isArray(classes)) {
        return classes.join(" ");
      }
      return classes.toString();
    }
    return this.classes;
  }

  getAttributes(path) {
    if (path) {
      const attributes = objectPath.get(this.attributes, path) || [];
      return attributes;
    }
    return [];
  }

  getLayout() {
    if (objectPath.get(this.config, "self.layout") === "blank") {
      return "blank";
    }

    return "default";
  }

  /**
   * Init Layout
   */
  initLayout() {
    if (objectPath.has(this.config, "self.body.background-image")) {
      document.body.style.backgroundImage =
        'url("' +
        objectPath.get(this.config, "self.body.background-image") +
        '")';
    }

    const _selfBodyClass = objectPath.get(this.config, "self.body.class");
    if (_selfBodyClass) {
      const bodyClasses = _selfBodyClass.toString().split(" ");
      bodyClasses.forEach(cssClass => document.body.classList.add(cssClass));
    }

    // Offcanvas directions
    document.body.classList.add("kt-quick-panel--right");
    document.body.classList.add("kt-demo-panel--right");
    document.body.classList.add("kt-offcanvas-panel--right");
  }

  /**
   * Init Loader
   */
  initLoader() {}

  /**
   * Init Header
   */
  initHeader() {
    // Fixed header
    if (objectPath.get(this.config, "header.self.fixed.desktop.enabled")) {
      document.body.classList.add("kt-header--fixed");
      objectPath.push(this.classes, "header", "kt-header--fixed");
      const minimizeCssClasses = objectPath.get(this.config, "header.self.fixed.desktop.mode");
      if (minimizeCssClasses) {
        document.body.classList.add(minimizeCssClasses);
      }

      this.attributes.header["data-ktheader-minimize"] = "1";
    } else {
      document.body.classList.add("kt-header--static");
    }

    if (objectPath.get(this.config, "header.self.fixed.mobile")) {
      document.body.classList.add("kt-header-mobile--fixed");
      objectPath.push(this.classes, "header_mobile", "kt-header-mobile--fixed");
    }

    if (objectPath.get(this.config, "header.self.width") === "fluid") {
      objectPath.push(this.classes, "header_container", "kt-container--fluid");
    }
  }

  /**
   * Init Subheader
   */
  initSubheader() {
    // Fixed content head
    if (objectPath.get(this.config, "subheader.fixed")) {
      document.body.classList.add("kt-subheader--fixed");
    }

    if (objectPath.get(this.config, "subheader.display")) {
      document.body.classList.add("kt-subheader--enabled");
    }

    if (objectPath.has(this.config, "subheader.style")) {
      document.body.classList.add(
        "kt-subheader--" + objectPath.get(this.config, "subheader.style")
      );
    }

    if (objectPath.get(this.config, "subheader.width") === "fluid") {
      objectPath.push(
        this.classes,
        "subheader_container",
        "kt-container--fluid"
      );
    }

    if (objectPath.get(this.config, "subheader.clear")) {
      objectPath.push(this.classes, "subheader", "kt-subheader--clear");
    }
  }

  /**
   * Init Content
   */
  initContent() {
    if (objectPath.get(this.config, "content.width") === "fluid") {
      objectPath.push(this.classes, "content_container", "kt-container--fluid");
    }
  }

  /**
   * Init Aside
   */
  initAside() {

  }

  /**
   * Init Footer
   */
  initFooter() {
    // Fixed header
    const footerSelfLayout = objectPath.get(this.config, "footer.self.layout");
    if (footerSelfLayout) {
      objectPath.push(this.classes, "footer", "kt-container--" + footerSelfLayout);
    }

    if (objectPath.get(this.config, "footer.self.width") === "fluid") {
      objectPath.push(this.classes, "footer_container", "kt-container--fluid");
    }
  }
}
