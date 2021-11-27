const filterIDcase = document.getElementById('filterIDcase');
const filterName = document.getElementById('filterName');
const filterID = document.getElementById('filterID');

async function filterPatients(idcase, name, id) {
    const data = [idcase,name,id];
    console.log(data);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/filter', options);
    //const dates = await response.json();

}

filterIDcase.addEventListener('change',  function () {
    filterPatients(filterIDcase.value, filterName.value, filterID.value);
});

filterName.addEventListener('change',  function () {
    filterPatients(filterIDcase.value, filterName.value, filterID.value);
});

filterID.addEventListener('change',  function () {
    filterPatients(filterIDcase.value, filterName.value, filterID.value);
});