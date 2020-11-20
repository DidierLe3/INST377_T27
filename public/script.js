/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

const top_contr = document.querySelector('.top_contr');

$(document).ready(() => {
  $('#map').usmap({});
});

async function getData(state) {
  const leg = [];
  const responce = await fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=${state}&output=json&apikey=0e31f29705fa26f604e00f070aea5e11`);
  const data = await responce.json();
  // console.log(data)
  leg.push(data.response.legislator);
  // ['@attributes'].cid);

  // console.log(leg[0]);

  return leg[0];
}
<<<<<<< HEAD

const contr_arr = [];
async function getContr(CID) {
  // console.log(CID);
  const contr_Res = await fetch(`https://www.opensecrets.org/api/?method=candContrib&cid=${CID}&cycle=2020&output=json&apikey=0e31f29705fa26f604e00f070aea5e11`);
  // console.log(contr_Res)
=======
async function getContr(cid_name) {
  const contr_arr = [];
  const org_total = [];
  const contr_Res = await fetch(`https://www.opensecrets.org/api/?method=candContrib&cid=${cid_name[0]}&cycle=2020&output=json&apikey=0e31f29705fa26f604e00f070aea5e11`);
>>>>>>> 2e39d179afcbeb13947213bde464fdb9399b6d4f
  const contributors = await contr_Res.json();
  for (num in contributors.response.contributors.contributor) {
    org_total.push([contributors.response.contributors.contributor[num]['@attributes'].org_name, contributors.response.contributors.contributor[num]['@attributes'].total]);
  }
  contr_arr.push(cid_name[1], org_total);
  console.log(contr_arr);
  const html = contr_arr.map((place) =>
  // for (x in place) {
  // console.log(place[0]);
  // }

    `
        <li>
            <span class= "name">${place[0]}</span> <br>

        </li>
    `).join('');
  top_contr.innerHTML = html;
  // top_contr.innerHTML = contr_arr[0][1][0]['@attributes'].org_name;

  // console.log(contr_arr[0][0]);
  // [1][0]['@attributes'].org_name);
}

$('#map').usmap({
  click: function(event, data) {
    $('#clicked-state');
    // console.log(data.name);
    const CID = getData(data.name);
    CID.then((result) => {
      const cid_name = [];
      // console.log(result['@attributes'])
      for (num in result) {
        // console.log(result[num]['@attributes']);
        id = result[num]['@attributes'].cid;
        leg_name = result[num]['@attributes'].firstlast;
        cid_name.push([id, leg_name]);
      }
      for (num in cid_name) {
        // console.log(cid_name[num]);
        getContr(cid_name[num]);
      }
    });
  }
});