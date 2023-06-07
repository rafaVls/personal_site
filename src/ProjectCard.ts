function oneLineNode(tag: string, options: Object = null) {
  return Object.assign(document.createElement(tag), options);
}

class ProjectCard {
  private _card = oneLineNode("div", { className: "project-card" });
  private _info = oneLineNode("div", { className: "project-info" });
  private _title = oneLineNode("p", { className: "project-title" });
  private _description = oneLineNode("p", { className: "project-description" });
  private _stackTitle = oneLineNode("p", { className: "project-stack" });
  private _stack = oneLineNode("p");
  private _links = oneLineNode("div", { className: "project-links" });
  private _repoAnchor = oneLineNode("a");
  private _websiteAnchor = oneLineNode("a");

  constructor(
    title: string,
    description: string,
    stack: string[],
    repoHref: string,
    websiteHref: string,
    imageUrl: string
  ) {
    this._title.textContent = title;
    this._description.textContent = description;
    this._stack.textContent = stack.join(", ");
    this._card.style.backgroundImage = `url(${imageUrl})`;
    this._stackTitle.textContent = "Stack";

    this.setupAnchor("Website", websiteHref, this._websiteAnchor);
    this.setupAnchor("Repo", repoHref, this._repoAnchor);

    this._card.append(this._info);
    this._info.append(
      this._title,
      this._description,
      this._stackTitle,
      this._stack,
      this._links
    );
  }

  setupAnchor(type: "Website" | "Repo", href: string, anchorElement: HTMLElement) {
    if (!href) {
      return;
    }

    anchorElement.textContent = type;
    anchorElement.setAttribute("href", href);
    anchorElement.setAttribute("target", "_blank");
    this._links.append(anchorElement);
  }

  createCard() {
    return this._card;
  }
}

export default ProjectCard;
