import resultsByPrinciple from "../../_utils/results-by-principle.js";
import resultsBySuccessCriterion from "../../_utils/results-by-success-criterion.js";

export default {
    eleventyComputed: {
        resultsBySuccessCriterion: (data) => resultsBySuccessCriterion(data),
        resultsByPrinciple: (data) => resultsByPrinciple(data)
    }
};
