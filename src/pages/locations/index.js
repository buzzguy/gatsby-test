import React from "react";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const LocationsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title }
    }
  }
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Locations | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: "6rem" }}
          >
            <h1 className="title is-size-2 is-bold-light">Locations</h1>
            <ul className="taglist">
              {group.map(item => (
                <li key={item.fieldValue}>
                  <Link to={`/locations/${kebabCase(item.fieldValue)}/`}>
                    {item.fieldValue} ({item.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default LocationsPage;

export const tagPageQuery = graphql`
  query LocationsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___locations) {
        fieldValue
        totalCount
      }
    }
  }
`;
