/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */


$(document).ready(() => {
  $('#map').usmap({});
});
const leg = [];

async function getData(state) {
  const responce = await fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=${state}&output=json&apikey=0e31f29705fa26f604e00f070aea5e11`);
  const data = await responce.json();
  leg.push(data.response.legislator[0]['@attributes'].cid);
  console.log(leg);

  return leg[0];
}

const contr_arr = [];
async function getContr(CID) {
  // console.log(CID);
  const contr_Res = await fetch(`https://www.opensecrets.org/api/?method=candContrib&cid=${CID}&cycle=2020&output=json&apikey=0e31f29705fa26f604e00f070aea5e11`);
  // console.log(contr_Res)
  const contributors = await contr_Res.json();
  contr_arr.push(contributors.response.contributors.contributor);
  console.log(contr_arr[0]);
}
// const state = 'AR';
// const CID = getData(state);
// console.log(CID)
// CID.then((result) => {
//   getContr(result);
//   // console.log(result);
// });

$('#map').usmap({
  click: function(event, data) {
    $('#clicked-state');
    console.log(data.name);
    const CID = getData(data.name);
    CID.then((result) => {
      getContr(result);
      // console.log(result);
    });
  }
});