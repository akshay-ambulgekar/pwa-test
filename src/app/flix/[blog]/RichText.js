import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import "@/Styles/flix-blogs/flix-blogs.css";
import PropTypes from 'prop-types';

function RichText({ data }) {
  return (
    <div className={"flix-blog " }>
      <BlocksRenderer content={data} />
    </div>
  );
}

export default RichText;

RichText.propTypes={
  data:PropTypes.string
};