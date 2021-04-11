import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Remarkable } from 'remarkable';
import axiosClient from 'api/axiosClient';
import Toastify from 'components/Toastify';
import 'tui-grid/dist/tui-grid.css';
import GridToast from '@toast-ui/react-grid';
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

const customUserAgent = "Sia-Agent";

const client = new SkynetClient("https://siasky.net", { customUserAgent });

const { publicKey, privateKey } = genKeyPairFromSeed("this seed should be fairly long for security");

const dataKey = "antSkySheets";

async function doStuffsDownload() {
  try {
    const { entry, signature } = await client.registry.getEntry(publicKey, dataKey);
    console.log(entry);
    console.log(signature);
  } catch (error) {
    console.log(error);
  }
}

const json = { datakey:"dataKey", data: "This is some example JSON data.", revision:1002n };

async function doStuffsUpload() {
  try {
    await client.registry.setEntry(privateKey, json);
  } catch (error) {
    console.log(error);
  }
  console.log("winner winner chicken dinner?")
}

const useStyles = makeStyles((theme) => ({
  center: {
    paddingTop: '15vh',
  },
  pt: {
    padding: '5px 15px',
  },
  ch: {
    height: '100%',
  },
  sc: {
    overflow: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  bt: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '55px',
  },
}));

export default function Post() {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  const [handleChange, setHandleChange] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(0);
  const [wantPublic, setPublic] = useState(false);

  return (
      <div className={`${classes.center} ${classes.ch}`}>
        <button onClick={doStuffsUpload}>Upload</button>
        <button onClick={doStuffsDownload}>Download</button>
      </div>
  );
}
