
import {Avatar,Divider} from 'antd'
import '../public/style/components/author.css'
import {GithubOutlined,QqOutlined,WechatOutlined} from '@ant-design/icons'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={80} src="https://i1.hdslb.com/bfs/face/bc60890e4188fa4dc31dd69bb3718e7484e30757.jpg@150w_150h.jpg"  /></div>
            <div className="author-introduction">
                光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined /> } className="account"  />
                <Avatar size={28} icon={<QqOutlined />}  className="account" />
                <Avatar size={28} icon={<WechatOutlined />} className="account"  />

            </div>
        </div>
    )

}

export default Author