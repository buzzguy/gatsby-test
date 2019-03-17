import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import ListItem from "./ListItem";

class ListClients extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => {
            const { id, frontmatter, fields, excerpt } = post;
            return (
              <ListItem
                id={id}
                frontmatter={frontmatter}
                fields={fields}
                excerpt={excerpt}
              />
            );
          })}
      </div>
    );
  }
}

ListClients.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query ListClientsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "client" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ListClients data={data} count={count} />}
  />
);
