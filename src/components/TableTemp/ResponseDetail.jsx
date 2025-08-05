

const ResponseDetail = ({ answers, items }) => {
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
    <div className="detailWrapper">
      {answeredItems.map(({ qid, title, answer }) => {
        const textAnsArr = answer?.textAnswers?.answers || [];
        const answerText = textAnsArr.map((a) => a.value).join(', ');
        return (
          <div className="newCard newSmallCard" key={qid} > 
            <h6 className="newCardtitle">{title}</h6>
            <p className="newCardcontent">{answerText}</p>
          </div>
        );
      })}
    </div>
  )
}


export default ResponseDetail