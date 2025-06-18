import React from 'react';

const IndividualResponse = ({ answers, items }) => {
  const answersMap = answers || {};

  const answeredItems = items
    .map((item) => {
      const qid = item?.questionItem?.question?.questionId;
      if (!qid || !answersMap[qid]) return null;
      return { qid, title: item.title || 'Untitled Question', answer: answersMap[qid] };
    })
    .filter(Boolean);

  if (answeredItems.length === 0) {
    return (
      <tr className="expanded-row">
        <td colSpan={4}>
          <div className="details-container">
            <p><em>No answers provided.</em></p>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="expanded-row">
      <td colSpan={4}>
        <div className="details-container">
          {answeredItems.map(({ qid, title, answer }) => {
            const textAnsArr = answer?.textAnswers?.answers || [];
            const answerText = textAnsArr.map((a) => a.value).join(', ');
            return (
              <div key={qid} className="qa-card">
                <b>{title}</b>
                <p>{answerText}</p>
              </div>
            );
          })}
        </div>
      </td>
    </tr>
  );
}

export default IndividualResponse;