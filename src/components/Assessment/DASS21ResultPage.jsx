import { useLocation } from "react-router-dom";

import BackToHomeButton from "../../components/Button/BackToHomeButton";
import UserLayout from "../../layout/UserLayout";

const calculateDASS21 = (answers) => {
  let anxiety = 0, stress = 0, depression = 0;

  answers.forEach((answer) => {
    if ([2, 4, 7, 9, 15, 19, 20].includes(answer.questionId)) {
      anxiety += answer.answer;
    } else if ([1, 6, 8, 11, 12, 14, 18].includes(answer.questionId)) {
      depression += answer.answer;
    } else if ([3, 5, 10, 13, 16, 17, 21].includes(answer.questionId)) {
      stress += answer.answer;
    }
  });

  return { anxiety, stress, depression };
};

const DASS21ResultPage = () => {
  const location = useLocation();
  const answers = location.state?.answers;

  if (!answers) {
    return <p>No answers available.</p>;
  }

  const scores = calculateDASS21(answers);

  return (
    <UserLayout>
      <BackToHomeButton className="btn-lg mx-auto block mt-6" />
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="p-6 mb-6 shadow-lg rounded-lg bg-blue-100">
          <h2 className="text-3xl font-semibold">ผลคะแนนแบบประเมิน</h2>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {["anxiety", "depression", "stress"].map((type) => (
            <div key={type} className="card bg-white shadow-xl p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-center">
                {type === "anxiety" ? "Anxiety Score" : type === "depression" ? "Depression Score" : "Stress Score"}
              </h3>
              <div className="flex justify-center mt-4">
                <img
                  className="h-32"
                  src={
                    type === "anxiety"
                      ? "https://img.freepik.com/free-vector/woman-angry-emotional-face-character-business-woman-doodle-cartoon-character_40876-3212.jpg"
                      : "https://img.freepik.com/free-vector/hand-drawn-doodle-business-woman-headache-from-work-harddoodle-cartoon-style_40876-3211.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="mt-4 text-center text-4xl">
                {scores[type]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default DASS21ResultPage;
