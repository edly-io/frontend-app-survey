import React, { useCallback } from "react";

export default function DownloadCSV({ data, filename = null }) {
  const fileName = filename || `responses_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.csv`;

  const buildHeaderMap = (data) => {
    const items = data?.meta?.items || [];
    return items.map((item) => {
      const q = item?.questionItem?.question || {};
      const questionId = q?.questionId || item?.itemId;
      return {
        itemId: item?.itemId,
        questionId,
        title: item?.title || questionId,
      };
    });
  };

  const extractAnswerValue = (ans) => {
    if (!ans) return "";
    // textAnswers (Google-like)
    if (ans.textAnswers && Array.isArray(ans.textAnswers.answers)) {
      return ans.textAnswers.answers.map((a) => (a?.value ?? "")).join(" | ");
    }
    // choiceAnswers (if provided in other shapes)
    if (ans.choiceAnswers && Array.isArray(ans.choiceAnswers.answers)) {
      return ans.choiceAnswers.answers.map((a) => (a?.value ?? "")).join(" | ");
    }
    // simple value fallback
    if (ans.value !== undefined) return String(ans.value);
    return "";
  };

  const escapeCsv = (value) => {
    if (value === null || value === undefined) return "";
    const s = String(value);
    // If contains double quotes, double them. If contains comma/newline/quote, wrap in quotes.
    const hasSpecial = /[",\n\r]/.test(s);
    const escaped = s.replace(/"/g, '""');
    return hasSpecial ? `"${escaped}"` : escaped;
  };

  const generateCsv = (data) => {
    if (!data) return "";
    const headerMap = buildHeaderMap(data);
    const headers = headerMap.map((h) => h.title || h.questionId || h.itemId);
    const rows = (data.responses || []).map((resp) => {
      return headerMap.map((h) => {
        // Prefer questionId key in answers, but fall back to itemId
        const answerObj = (resp.answers && (resp.answers[h.questionId] || resp.answers[h.itemId])) || null;
        return extractAnswerValue(answerObj);
      });
    });

    const csvLines = [];
    csvLines.push(headers.map(escapeCsv).join(","));
    rows.forEach((row) => {
      csvLines.push(row.map(escapeCsv).join(","));
    });

    return `\uFEFF${csvLines.join("\r\n")}`;
  };

  const handleDownload = useCallback(() => {
    console.log(data);
    if (!data) return;
    try {
      const csv = generateCsv(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      // eslint-disable-next-line no-console
      alert("Failed to generate CSV. See console for details.");
    }
  }, [data, fileName]);

  return (
    <div className="flex items">
      <div>
        <span
          onClick={handleDownload}
          disabled={!data || !(data.responses && data.responses.length)}
          style={{ 
            backgroundColor: '#BE3712',
            color: 'white',
            cursor: 'pointer'
          }}
          className={`px-4 py-2 rounded shadow-sm text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Download CSV
        </span>
      </div>
    </div>
  );
}
