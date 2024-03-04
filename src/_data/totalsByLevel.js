import successCriteria from "./successCriteria.js";

export default async function () {
  const totals = {
    2.2: {
      A: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
      AA: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
      AAA: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
    },
    2.1: {
      A: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
      AA: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
      AAA: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
    },
    "2.0": {
      A: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
      AA: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
      AAA: {
        all: 0,
        perceivable: 0,
        operable: 0,
        understandable: 0,
        robust: 0,
      },
    },
  };
  let criteria;

  try {
    criteria = await successCriteria();
  } catch (error) {
    console.error(`Fetch failed in totalsPerLevel.js. ${error}`);
  }

  Object.values(criteria).forEach((sc) => {
    sc.versions.forEach((version) => {
      if (sc.level !== "") {
        totals[version][sc.level]["all"]++;
        totals[version][sc.level][sc.principle.toLowerCase()]++;

        if (sc.level == "A") {
          totals[version]["AA"]["all"]++;
          totals[version]["AA"][sc.principle.toLowerCase()]++;
          totals[version]["AAA"]["all"]++;
          totals[version]["AAA"][sc.principle.toLowerCase()]++;
        }

        if (sc.level == "AA") {
          totals[version]["AAA"]["all"]++;
          totals[version]["AAA"][sc.principle.toLowerCase()]++;
        }
      }
    });
  });

  return totals;
}
