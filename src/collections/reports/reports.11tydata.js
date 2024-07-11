import scSupport from "../../_utils/sc-support.js";
import scTable from "../../_utils/sc-table.js";

export default {
    eleventyComputed: {
        scSupport: (data) => scSupport(data.successCriteria, data.issues, data),
        scTable: (data) => scTable(data.successCriteria, data.issues, data)
    }
};
