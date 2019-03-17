import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

class LocationRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}>
        <Link to={post.node.fields.slug}>
          <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
        </Link>
      </li>
    ));
    const location = this.props.pageContext.location;
    const title = this.props.data.site.siteMetadata.title;
    const totalCount = this.props.data.allMarkdownRemark.totalCount;
    const locationHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } locationged with “${location}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${location} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: "6rem" }}
              >
                <h3 className="title is-size-4 is-bold-light">
                  {locationHeader}
                </h3>
                <ul className="locationlist">{postLinks}</ul>
                <p>
                  <Link to="/locations/">Browse all locations</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default LocationRoute;

export const locationPageQuery = graphql`
  query LocationPage($location: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { locations: { in: [$location] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
