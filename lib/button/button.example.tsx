import Button from "./button";
import React ,{useState}from 'react';
import './button.example.scss'


export default () => {
  const [loading,setLoading]=useState(false);
  return (
    <div>
      <div className={'button-type'}>
        <Button>Default </Button>
        <Button Type={'primary'}>Primary </Button>
        <Button Type={'disabled'}>disabled </Button>
        <Button Type={'warning'}>Warning</Button>
        <Button Type={'danger'}>danger</Button>
        <Button Type={'dashed'}>dashed</Button>
      </div>
      <div className={'button-type'}>
        <Button icon="wechat">
          图标
        </Button>
        <Button icon="wechat" position={'right'}>
          图标
        </Button>
        <Button icon="wechat" position={'right'}>
          图标
        </Button>
        <Button icon="wechat" >
          图标
        </Button>
      </div>
      <div>
        <Button loading>加载</Button>
        <Button loading={loading} onClick={()=>{setLoading(!loading)}} icon={'alipay'}>点击</Button>
      </div>
      <div>
        <Button size={'large'}>大号</Button>
        <Button >中号</Button>
        <Button size={'small'}>小号</Button>
      </div>
    </div>
  )
  
  
};