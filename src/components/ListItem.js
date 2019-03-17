import React from "react";
import { Link } from "gatsby";
const ListItem = ({ id, frontmatter, fields, excerpt }) => (
  <div className="is-parent column is-6" key={id}>
    <article className="tile is-child box notification">
      <p>
        <Link className="title has-text-primary is-size-4" to={fields.slug}>
          {frontmatter.title}
        </Link>
        <span> &bull; </span>
        <span className="subtitle is-size-5 is-block">{frontmatter.date}</span>
      </p>
      <p>
        {excerpt}
        <br />
        <br />
        <Link className="button" to={fields.slug}>
          Keep Reading →
        </Link>
      </p>
    </article>
  </div>
);

export default ListItem;
