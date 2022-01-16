import React, { useState } from "react";
import http from "../Common/RestAPIHandler";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AccordionActions from "@material-ui/core/AccordionActions";
import EditIcon from "@material-ui/icons/Create";
import AlertDialog from "../Common/AlertDialog";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  accordionDetailsRoot: {
    paddingLeft: 55,
    paddingRight: 55,
  },
  accordionSummaryRoot: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
}));

const CollectionAccordion = ({
  collection,
  refreshCollectionsData,
  handleCollectionEditClick,
}) => {
  const classes = useStyles();

  const [alertOpen, setAlertOpen] = useState(false);

  const handleDeleteRestaurantClick = (restaurantId) => {
    http.Delete(
      `collection/restaurants/`,
      {
        restaurant: restaurantId,
        collection: collection.id,
      },
      () => {
        refreshCollectionsData();
      },
      () => {}
    );
  };

  const handleDeleteCollectionClick = () => {
    setAlertOpen(true);
  };

  const handleAgree = () => {
    setAlertOpen(false);

    http.Delete(
      `collections/${collection.id}/`,
      {},
      () => {
        refreshCollectionsData();
      },
      () => {}
    );
  };

  const handleDisagree = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <AlertDialog
        open={alertOpen}
        primaryMessage="Are you sure want to delete?"
        secondaryMessage="This will delete all related restaurants of this collection permanently."
        onAgree={handleAgree}
        onDisagree={handleDisagree}
      ></AlertDialog>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={collection.id}
          classes={{
            root: classes.accordionSummaryRoot,
          }}
        >
          <Typography>{collection.name}</Typography>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: classes.accordionDetailsRoot,
          }}
        >
          <Grid spacing={0} container alignItems="center">
            {collection.restaurants.map((r) => (
              <React.Fragment key={r.id}>
                <Grid item xs={8}>
                  {r.name}
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteRestaurantClick(r.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="fullWidth" />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() =>
              handleCollectionEditClick(collection.id, collection.name)
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDeleteCollectionClick}
          >
            <DeleteIcon />
          </IconButton>
        </AccordionActions>
      </Accordion>
    </>
  );
};

export default CollectionAccordion;
