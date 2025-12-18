const CLASS_OPTIONSITEM__SELECTED = 'OptionsItem--selected';
const CLASS_HIDDEN = 'hidden';
const USING = 'using';
const AS = 'as';
const summaryAsUsingList = document.querySelectorAll('.OrderSummaryAsUsing');

let optionsWrapperButtons = document.querySelectorAll('.OptionsWrapper');
let prefValue;
let beanTypeValue;
let grindValue;
let qtyValue;
let deliveryValue;

const shipmentPrices = {
    '250g': { weekly: 7.2, biweekly: 9.6, monthly: 12.0 },
    '500g': { weekly: 13.0, biweekly: 17.5, monthly: 22.0 },
    '1000g': { weekly: 22.0, biweekly: 32.0, monthly: 42.0 },
};
const orderSummaryDialog = document.querySelector('#orderSummaryDialog');
const subscribeBtn = document.querySelector('#subscribeBtn');
const checkoutBtn = document.querySelector('#checkoutBtn');

optionsWrapperButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        let optionsItem = this.closest('.OptionsItem');

        if (!optionsItem.classList.contains(CLASS_OPTIONSITEM__SELECTED)) {
            //get the currently selected OptionsItem, if any, and unselect it
            let sibling = optionsItem.parentNode.querySelector(
                `.${CLASS_OPTIONSITEM__SELECTED}`,
            );

            if (sibling != null) {
                sibling.classList.remove(CLASS_OPTIONSITEM__SELECTED);
            }

            optionsItem.classList.add(CLASS_OPTIONSITEM__SELECTED);
            processSelection(optionsItem);
        }
    });
});

if (subscribeBtn != null) {
    subscribeBtn.addEventListener('click', function (e) {
        e.preventDefault();

        let monthlyCost = calculateMonthlyCost(qtyValue, deliveryValue);
        let monthlyCostText =
            orderSummaryDialog.querySelector('.OrderTotalAmount');
        monthlyCostText.innerHTML = monthlyCost.toFixed(2);
        orderSummaryDialog.showModal();
    });
}

if (checkoutBtn != null) {
    checkoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        orderSummaryDialog.close();
    });
}

function processSelection(optionsItem) {
    let questionsItem = optionsItem.closest('.QuestionsItem');
    let dataQuestion = questionsItem.getAttribute('data-question');
    let title = optionsItem.querySelector('.OptionsItem__title');

    switch (dataQuestion) {
        case 'pref':
            prefValue = optionsItem.getAttribute('data-pref');
            enableDisableGrindDetails(prefValue);
            updateSummaryAsUsing(prefValue);
            break;
        case 'beantype':
            beanTypeValue = optionsItem.getAttribute('data-beantype');
            break;
        case 'grind':
            grindValue = optionsItem.getAttribute('data-grind');
            break;
        case 'qty':
            qtyValue = optionsItem.getAttribute('data-qty');
            updateShipmentPriceText(qtyValue);
            break;
        case 'delivery':
            deliveryValue = optionsItem.getAttribute('data-delivery');
            break;
        default:
    }

    updateSummaryText(dataQuestion, title.textContent);
    enableDisableSubscribeBtn();
}

function enableDisableGrindDetails(pref) {
    let grindDetails = document.querySelector('#questionGrind details');

    if (pref === 'capsule') {
        disableDetails(grindDetails);
        showGrindText(false);
    } else {
        enableDetails(grindDetails);
        showGrindText(true);
    }
}

function disableToggle(event) {
    event.preventDefault();
}

function disableDetails(details) {
    details.open = false;
    details.addEventListener('click', disableToggle);
    details.setAttribute('data-disabled', true);
    //prevent keyboard focus
    details.querySelector('summary').setAttribute('tabindex', -1);
}

function enableDetails(details) {
    details.removeEventListener('click', disableToggle);
    details.removeAttribute('data-disabled');
    details.querySelector('summary').removeAttribute('tabindex');
}

function updateSummaryAsUsing(pref) {
    if (pref === 'capsule') {
        summaryAsUsingList.forEach((elem) => {
            elem.innerHTML = USING;
        });
    } else {
        summaryAsUsingList.forEach((elem) => {
            elem.innerHTML = AS;
        });
    }
}

function updateSummaryText(dataSuffix, value) {
    let fields = document.querySelectorAll(
        `span[data-summary='${dataSuffix}']`,
    );
    fields.forEach((f) => {
        f.innerHTML = value;
    });
}

function showGrindText(showText) {
    let grindText = document.querySelectorAll('.OrderSummary__grindText');
    if (showText) {
        grindText.forEach((f) => {
            f.classList.remove(CLASS_HIDDEN);
        });
    } else {
        grindText.forEach((f) => {
            f.classList.add(CLASS_HIDDEN);
        });
    }
}

function updateShipmentPriceText(qty) {
    const weeklyShipmentPriceText = document.querySelector(
        '#deliveryWeekly .ShipmentPrice',
    );
    const biWeeklyShipmentPriceText = document.querySelector(
        '#deliveryBiWeekly .ShipmentPrice',
    );
    const monthlyShipmentPriceText = document.querySelector(
        '#deliveryMonthly .ShipmentPrice',
    );

    weeklyShipmentPriceText.innerHTML = shipmentPrices[qty].weekly.toFixed(2);
    biWeeklyShipmentPriceText.innerHTML =
        shipmentPrices[qty].biweekly.toFixed(2);
    monthlyShipmentPriceText.innerHTML = shipmentPrices[qty].monthly.toFixed(2);
}

function calculateMonthlyCost(qty, delivery) {
    let monthlyCost = 0;

    if (delivery === 'weekly') {
        monthlyCost = shipmentPrices[qty].weekly * 4;
    } else if (delivery === 'biweekly') {
        monthlyCost = shipmentPrices[qty].biweekly * 2;
    } else if (delivery === 'monthly') {
        monthlyCost = shipmentPrices[qty].monthly;
    }

    return monthlyCost;
}

function enableDisableSubscribeBtn() {
    if (
        prefValue != null &&
        beanTypeValue != null &&
        qtyValue != null &&
        deliveryValue != null &&
        (prefValue === 'capsule' ||
            (prefValue !== 'capsule' && grindValue != null))
    ) {
        subscribeBtn.disabled = false;
    } else {
        subscribeBtn.disabled = true;
    }
}
