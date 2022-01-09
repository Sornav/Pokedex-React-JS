import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  rootColumn: {
    display: "flex",
    flexDirection: "column",
  },
  rootRow: {
    display: "flex",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  rowInColumn: {
    display: "flex",
    flexShrink: "0",
  },
  row: {
    display: "flex",
    flexGrow: 1,
  },
});

function getRootWidth(root, outerMargin, width, spacing, theme) {
  if (root) {
    if (outerMargin) {
      return `calc(${width} + ${theme.typography.pxToRem(spacing)})`;
    }
    return "100%";
  }
  return width;
}

function getRootMargin(root, outerMargin, spacing, theme) {
  if (root) {
    if (outerMargin) {
      return theme.typography.pxToRem(-spacing / 2);
    }
    return "";
  }
  return "";
}

function renderElement(
  data,
  getComponent,
  classes,
  spacing,
  theme,
  outerMargin
) {
  const layoutType = data.alignment === "horizontal" ? "row" : "column";
  return (
    <div
      className={(() => {
        if (layoutType === "row") {
          if (data.root) {
            return classes.rootRow;
          }
          return classes.row;
        }
        if (data.root) {
          return classes.rootColumn;
        }
        return classes.column;
      })()}
      style={{
        width: getRootWidth(data.root, outerMargin, data.width, spacing, theme),
        height: data.height,
        margin: getRootMargin(data.root, outerMargin, spacing, theme),
        // width: data.root ? `calc(${data.width} + ${pxToRem(spacing)})` : data.width,
        // margin: data.root ? pxToRem(-spacing / 2) : ""
      }}
    >
      {data.content.map((cardData) =>
        !cardData.content ? (
          <div
            className={classes.rowInColumn}
            style={{
              boxSizing: "border-box",
              height: cardData.height,
              width: cardData.width,
              padding: theme.typography.pxToRem(spacing),
            }}
          >
            {cardData.component ? getComponent(cardData.component) : ""}
          </div>
        ) : (
          renderElement(cardData, getComponent, classes, spacing, theme)
        )
      )}
    </div>
  );
}

function FlexGrid(props) {
  const {
    classes,
    getComponent,
    layoutConfiguration,
    outerMargin = false,
    theme,
  } = props;

  const { spacing } = layoutConfiguration;

  return renderElement(
    layoutConfiguration,
    getComponent,
    classes,
    spacing,
    theme,
    outerMargin
  );
}

export default withStyles(styles, { withTheme: true })(FlexGrid);
