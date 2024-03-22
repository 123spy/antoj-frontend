import {Card, Divider, Space, Tabs} from "antd";
import {useEffect, useState} from "react";
import NewCard from "../../components/NewCard/NewCard";
import RecommendCard from "../../components/RecommendCard/RecommendCard";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import styles from "./HomePage.less";
import {getRandomQuestionVoUsingPost} from "@/services/apis/questionController";
import {Link} from "@@/exports";

const HomePage = () => {
  const [currentKey, setCurrentKey] = useState("new");
  const [question, setQuestion] = useState(null);
  const onChange = (key: string) => {
    // console.log(key);
    setCurrentKey(key);
  };

  const loadData = async () => {
    const res = await getRandomQuestionVoUsingPost();
    if (res?.code === 0) {
      setQuestion(res?.data);
    }
  };

  const items = [
    {
      key: "new",
      label: "最新",
    },
    {
      key: "recommend",
      label: "推荐",
    },
    {
      key: "activity",
      label: "活动",
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div id={"HomePage"} style={{background: "white", minHeight: "100vh"}}>
      {/*<div style={{height: 300}}></div>*/}
      <div style={{padding: "0 200px", paddingTop: 20}}>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
          <div style={{width: "70%", height: "fit-content"}}>
            {/*<Tabs size={"large"} items={items} onChange={onChange}/>*/}
            <div>
              <Space split={<Divider type={"vertical"}/>}>
                {items?.map((item, index) => {
                  if (currentKey === item?.key) {
                    return (
                      <div key={index}
                           style={{
                             background: "rgb(245,245,245)",
                             cursor: "pointer",
                             color: "black",
                             fontSize: "18px",
                             height: 38,
                             width: 55,
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                             borderRadius: 8,
                             fontWeight: 700
                           }}>
                        <div>{item?.label}</div>
                      </div>
                    )
                  }

                  return (
                    <div key={index}
                         onClick={() => {
                           setCurrentKey(item?.key)
                         }}
                         style={{
                           cursor: "pointer",
                           color: "black",
                           fontSize: "18px",
                           height: 38,
                           width: 55,
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           borderRadius: 8
                         }}>{item?.label}</div>
                  )
                })}
              </Space></div>
            <div style={{marginTop: 20}}>
              {currentKey === "new" && (
                <div>
                  <NewCard/>
                </div>
              )}
              {currentKey === "recommend" && (
                <div>
                  <RecommendCard/>
                </div>
              )}
              {currentKey === "activity" && (
                <div>
                  <ActivityCard/>
                </div>
              )}
            </div>
          </div>
          <div style={{width: "calc(30% - 40px)", height: "fit-content"}}>
            <Card>
              <div className={styles.everyCard}>
                <div style={{color: "lightseagreen", marginBottom: 12}}>每日一题</div>
                <div><Link style={{fontSize: 20, color: "black"}}
                           to={`/question/view/${question?.id}`}>{question?.title}</Link></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
