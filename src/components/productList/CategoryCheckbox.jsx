import PropTypes from "prop-types";

const CategoryCheckbox = ({
  isSelected,
  result,
  handleChange,
  handleTheChange,
}) => {
  return (
    <>
      <input
        style={{ margin: "2px" }}
        type="checkbox"
        id={result.id}
        name={result.data.name}
        value={result.data.name}
        onClick={(e) => {
          handleChange(e);
        }}
        onChange={handleTheChange}
        checked={isSelected}
      />

      <label htmlFor={result.id}>{result.data.name}</label>
    </>
  );
};

CategoryCheckbox.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  result: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleTheChange: PropTypes.func.isRequired,
};

export default CategoryCheckbox;
