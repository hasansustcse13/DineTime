import React from "react";
import http from "../Common/RestAPIHandler";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AccordionActions from "@material-ui/core/AccordionActions";
import EditIcon from "@material-ui/icons/Create";

const CollectionAccordion = ({
  collection,
  refreshCollectionsData,
  handleCollectionEditClick,
}) => {
  const handleDeleteRestaurantClick = (restaurantId) => {
    http.Delete(
      `collection/restaurants/`,
      {
        restaurant_id: restaurantId,
        collection_id: collection.id,
      },
      () => {
        refreshCollectionsData();
      },
      () => {}
    );
  };

  const handleDeleteCollectionClick = () => {
    http.Delete(
      `collections/${collection.id}/`,
      {},
      () => {
        refreshCollectionsData();
      },
      () => {}
    );
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={collection.id}
      >
        <Typography>{collection.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {collection.restaurants.map((r) => (
            <div key={r.id}>
              <ListItem>
                <ListItemText primary={r.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteRestaurantClick(r.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="fullWidth" />
            </div>
          ))}
        </List>
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
  );
};

export default CollectionAccordion;
