import React, { useEffect, useState } from "react";
import http from "../Common/RestAPIHandler";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CollectionAccordion from "./CollectionAccordion";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  divider: {
    height: 5,
    marginTop: 10,
    marginBottom: 10,
  },
}));

const FavoriteRestaurant = (props) => {
  const classes = useStyles();

  const [collections, setCollections] = useState([]);
  const [collectionFormData, setCollectionFormData] = useState({});
  const [formError, setFormError] = useState({});

  useEffect(() => {
    getCollectionsData();
  }, []);

  const getCollectionsData = () => {
    http.Get(
      `collections`,
      (data) => {
        setCollections(data);
      },
      () => {}
    );
  };

  const onInputChange = (e) => {
    setCollectionFormData({
      ...collectionFormData,
      [e.target.name]: e.target.value,
    });

    setFormError({
      ...formError,
      [e.target.name]: [],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (collectionFormData.id) {
      http.Put(
        `collections/${collectionFormData.id}/`,
        collectionFormData,
        (collection) => {
          setCollectionFormData({ name: "" });
          const newCollections = collections.map((c) =>
            c.id === collection.id ? collection : c
          );
          setCollections([...newCollections]);
        },
        (status, error) => {
          if (status === 400) {
            setFormError(error);
          }
        }
      );
    } else {
      http.Post(
        `collections/`,
        collectionFormData,
        (collection) => {
          setCollectionFormData({ name: "" });
          setCollections([...collections, collection]);
        },
        (status, error) => {
          if (status === 400) {
            setFormError(error);
          }
        }
      );
    }
  };

  const handleCollectionEditClick = (id, name) => {
    setCollectionFormData({
      id,
      name,
    });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          className={classes.container}
        >
          <Grid item xs={10} sm={8} md={4}>
            <TextField
              id="outlined-name-input"
              label="Collection Name"
              type="text"
              name="name"
              variant="outlined"
              fullWidth
              value={collectionFormData.name || ""}
              onChange={onInputChange}
              error={formError?.name?.length > 0}
              helperText={formError?.name?.length > 0 && formError.name[0]}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={8}>
            <Button type="submit" variant="contained" color="primary">
              {collectionFormData.id ? "Edit" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider variant="fullWidth" className={classes.divider} />

      {collections.length > 0 ? (
        <Grid container spacing={3}>
          {collections.map((collection) => (
            <Grid key={collection.id} item xs={12} sm={12} md={6} lg={6} xl={4}>
              <CollectionAccordion
                handleCollectionEditClick={handleCollectionEditClick}
                refreshCollectionsData={getCollectionsData}
                collection={collection}
              ></CollectionAccordion>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" component="h2" color="secondary">
          No Collection to Display
        </Typography>
      )}
    </div>
  );
};

export default FavoriteRestaurant;
