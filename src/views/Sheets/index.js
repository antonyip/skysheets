import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Remarkable } from 'remarkable';
import axiosClient from 'api/axiosClient';
import Toastify from 'components/Toastify';
import 'tui-grid/dist/tui-grid.css';
import GridToast from '@toast-ui/react-grid';

class CustomTextEditor {
  constructor(props) {
    const el = document.createElement('input');
    const { maxLength } = props.columnInfo.editor.options;

    el.type = 'text';
    el.maxLength = maxLength;
    el.value = String(props.value);

    this.el = el;
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  mounted() {
    this.el.select();
  }
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
    height: '45px',
  },
}));

var data = [
  {id: 1, name: 'Editor'},
  {id: 2, name: 'Grid'},
  {id: 3, name: 'Chart'}
];

var columns = [
  {name: 'id', header: 'ID', editor: 'text'},
  {name: 'name', header: 'Name', editor: 'text'},
  {name: 'name2', header: 'Name2', editor: 'text'},
];

export default function Post() {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  const [handleChange, setHandleChange] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(0);
  const [wantPublic, setPublic] = useState(false);
  const gridRef = React.createRef();

  const handleAppendRow = () => {
    gridRef.current.getInstance().appendRow({id: 4, name: 'ChartNew'});
  }

  const generateUUID = () => {
    let uuid = '';
    const cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      uuid += cs.charAt(Math.floor(Math.random() * cs.length));
    }
    return uuid;
  };

  const generateHTML = () => {
    var md = new Remarkable();
    var blob = new Blob(
      [
        '<html><head><title>' +
          title +
          '</title><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"><head><body><div style="margin-top: 30px;" class="container">' +
          md.render(handleChange) +
          '</div><script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script><script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script></body></html>',
      ],
      { type: 'text/html' }
    );
    var formData = new FormData();
    formData.append('file', blob);

    const uuid = generateUUID();
    fetch(`https://siasky.net/skynet/skyfile/${uuid}?filename=index.html`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setUrl(result.skylink);
        setPublic(true);
      })
      .catch((e) => console.log(e));
  };

  const publicJson = (record) => {
    const uuid = generateUUID();
    fetch(`https://siasky.net/skynet/skyfile/${uuid}?filename=index.json`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(record),
    })
      .then((response) => response.json())
      .then(async (result) => {
        try {
          await axiosClient.post(`${process.env.REACT_APP_SERVER_BASEURL}/upload`, {
            skylink: result.skylink,
          });
          setStatus(1);
        } catch (error) {
          console.log(error);
          setStatus(2);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={`${classes.center} ${classes.ch}`}>
      {status === 1 ? (
        <Toastify status={status} message='Public successfully' />
      ) : status === 2 ? (
        <Toastify status={status} message='Something wrong' />
      ) : (
        <></>
      )}
      <div>
      <button onClick={handleAppendRow}>Append Row</button>
      <button onClick={handleAppendRow}>Append Column</button>
      <button onClick={handleAppendRow}>Save</button>
      <button onClick={handleAppendRow}>Export To SkyNet</button>
      <GridToast
        ref={gridRef}
        data={data}
        columns={columns}
        rowHeight={25}
        bodyHeight={600}
        widthResizable={true}
        heightResizable={true}
        contentEditable={true}
      />
      </div>
      
    </div>   
  );
}
