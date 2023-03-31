import {
  DataService
} from './dataService.js';
const dataService = new DataService();

const table = document.querySelector('.main__table')
const tableTbody = table.querySelector('tbody');
const errorField = document.querySelector('.error__modal');
const headers = table.querySelectorAll('.th');
const tableBody = document.querySelector('.main__tbody');
const errorContainer = document.querySelector('.error__serv');
const errorContainerHeader = document.createElement('h2');
const errorContainerSpan = document.createElement('span');
const errorContainerButton = document.createElement('button');
errorContainerButton.classList.add('main__add');
errorContainerButton.textContent = 'Попробовать снова';
errorContainerButton.addEventListener('click', function () {
  location.reload();
})
errorContainer.append(errorContainerHeader);
errorContainer.append(errorContainerSpan);
errorContainer.append(errorContainerButton);

function clearModal() {
  const error = document.querySelectorAll('.contacts__errors');
  const inputs = document.querySelectorAll('.input-js');

  errorContainerHeader.textContent = '';
  errorContainerSpan.textContent = '';
  errorContainer.style.opacity = '0';
  errorContainer.style.visibility = 'hidden'

  inputs.forEach(el => {
    el.value = ''
  })

  errorField.textContent = ''
  const contacts = document.querySelectorAll('.contacts')
  contacts.forEach(el => {
    el.remove()
  })

  error.forEach(el => {
    el.classList.remove('active');
    el.innerHTML = '';
  })
}

// Модальное окно
function modal() {
  let modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close'),
    cancelButton = document.querySelectorAll('.js-modal-cancel');


  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
      modalElem.classList.add('active');
      overlay.classList.add('active');
    });

  });

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let parentModal = this.closest('.modal');
      parentModal.classList.remove('active');
      overlay.classList.remove('active');
      clearModal()
      location.hash = '';
      errorContainer.textContent = '';
      errorContainer.style.opacity = '0';
      errorContainer.style.visibility = 'hidden'
    });
  });

  cancelButton.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let parentModal = this.closest('.modal');
      parentModal.classList.remove('active');
      overlay.classList.remove('active');
      clearModal()
      location.hash = '';
    })
  })

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
    location.hash = '';
    clearModal();
  });
}

//======================================== Работа с добавлением клиента ==============================================
// Корректировка ФИО
function editedFullName(str) {
  if (str == '') return str;
  let strFirst = str.toLowerCase().trim();
  let strSecond = strFirst[0].toUpperCase() + strFirst.slice(1);
  return strSecond;
}

// РАБОТА С КЛИЕНТОМ.
async function createClientItem(id, fullname, created, edited, update, contactsClient, deleteContact) {
  const clientItem = document.createElement('tr');
  const clientId = document.createElement('td');
  const clientFullName = document.createElement('td');
  const clientCreated = document.createElement('td');
  const clientEdited = document.createElement('td');
  let clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  clientId.classList.add('main__tbody--td');
  clientFullName.classList.add('main__tbody--td');
  clientCreated.classList.add('main__tbody--td');
  clientEdited.classList.add('main__tbody--td');
  clientContacts.classList.add('main__tbody--td', 'main__tbody--contacts');
  clientActions.classList.add('main__tbody--td', 'main__tbody--last');

  const clientButtonEdited = document.createElement('a');
  clientButtonEdited.dataset.modal = '3'
  clientButtonEdited.classList.add('main__tbody--edit', 'js-open-modal');
  clientButtonEdited.innerHTML = `
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g opacity="0.7" clip-path="url(#clip0_121_2280)">
			<path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
			</g>
			<defs>
			<clipPath id="clip0_121_2280">
			<rect width="16" height="16" fill="white"/>
			</clipPath>
			</defs>
		</svg>
	Изменить
	`
  clientButtonEdited.dataset.id = deleteContact

  const clientButtonDeleted = document.createElement('a');
  clientButtonDeleted.dataset.modal = '2';
  clientButtonDeleted.classList.add('main__tbody--delete', 'js-open-modal');
  clientButtonDeleted.innerHTML = `
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g opacity="0.7" clip-path="url(#clip0_121_2305)">
			<path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
			</g>
			<defs>
			<clipPath id="clip0_121_2305">
			<rect width="16" height="16" fill="white"/>
			</clipPath>
			</defs>
		</svg>
	Удалить
	`

  clientActions.append(clientButtonEdited, clientButtonDeleted);

  clientItem.setAttribute('data-tr', id)
  clientId.innerHTML = id;
  clientId.dataset.id = id
  clientFullName.innerHTML = `<button class="js-open-modal " data-id="${id}" data-modal="4">${fullname}</button>`;
  clientFullName.addEventListener('click', async e => {
    e.preventDefault();
    dataService.searchClientsId(id).then((response) => {
      const {
        data
      } = response;

      cardClient(data.id, data.surname, data.name, data.lastName)
    })
  })
  clientCreated.innerHTML = created;
  clientCreated.dataset.create = id;
  clientEdited.dataset.update = update;
  clientEdited.innerHTML = edited;
  clientContacts = tableAddImgContact(contactsClient);

  // Модальное окно с удалением клиента
  clientButtonDeleted.dataset.id = deleteContact;
  const buttonDeleted = clientButtonDeleted.dataset.id;
  const modalDeleted = document.querySelector('.client__delete');
  const modalDeletedButton = modalDeleted.querySelector('.client__btn--delete');
  clientButtonDeleted.addEventListener('click', e => {
    e.preventDefault();
    modalDeletedButton.addEventListener('click', async e => {
      e.preventDefault();
      addFindErrors(dataService.deleteClient(buttonDeleted))
    })
  })

  // Модальное окно с редактированием клиента
  const modalChange = document.querySelector('.client__change');
  const modalChangeNumber = document.querySelector('.client__change--number');
  modalChange.dataset.id = deleteContact;
  const modalChangeId = modalChange.getAttribute('data-id');
  const modalChangeSurname = document.querySelector('.surname__edited');
  const modalChangeName = document.querySelector('.name__edited');
  const modalChangeLastName = document.querySelector('.lastname__edited');
  const modalChangeBtnSave = document.querySelector('.client__change--button');
  const modalChangeDelete = document.querySelector('.client__change--delete');

  clientButtonEdited.addEventListener('click', async e => {
    e.preventDefault();
    dataService.searchClientsId(modalChangeId).then((response) => {
      const {
        data
      } = response;

      modalChangeNumber.innerHTML = `ID: ${data.id}`;
      modalChangeSurname.value = data.surname;
      modalChangeName.value = data.name;
      modalChangeLastName.value = data.lastName;
      if (data.contacts) {
        changeClientContacts(data.contacts);
      }

      modalChangeBtnSave.addEventListener('click', async e => {
        e.preventDefault();
        let contactChange = getContacts();
        addFindErrors(
          dataService.changeClient(
            modalChangeId,
            editedFullName(modalChangeName.value),
            editedFullName(modalChangeSurname.value),
            editedFullName(modalChangeLastName.value),
            contactChange
          )
        )
      })
    })
  })
  modalChangeDelete.addEventListener('click', async e => {
    e.preventDefault();
    dataService.deleteClient(id)
  })

  clientItem.append(clientId, clientFullName, clientCreated, clientEdited, clientContacts, clientActions);
  tableTbody.append(clientItem);
  sortId();
}

function changeClientContacts(dataContact) {
  for (const clientContact of dataContact) {
    const modalChangeContacts = document.querySelector('.client__change--contact--container');
    const contact = document.createElement('div');
    contact.classList.add('contacts');
    const numberId = Math.floor(Math.random() * 8) + 2;
    const randomdiv = document.createElement('div');
    const inputContacts = document.createElement('input');
    inputContacts.classList.add('contacts__input');
    inputContacts.value = clientContact.value;
    const contactsButtonRemove = document.createElement('button');
    contactsButtonRemove.classList.add('contacts__remove');
    contact.id = numberId;
    contactsButtonRemove.id = numberId;
    contactsButtonRemove.innerHTML = `
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/>
		</svg>
		`
    contact.append(randomdiv, inputContacts, contactsButtonRemove)
    modalChangeContacts.prepend(contact);
    randomdiv.id = `select-${numberId}`;
    new ItcCustomSelect(`#select-${numberId}`, {
      targetValue: clientContact.type,
      options: [
        ['Email', 'Email'],
        ['Телефон', 'Телефон'],
        ['Vk', 'Vk'],
        ['Facebook', 'Facebook'],
        ['Другое', 'Другое']
      ]
    });

    contactsButtonRemove.addEventListener('click', e => {
      e.preventDefault();
      let targets = e.currentTarget;
      let targetsId = targets.id;
      if (targetsId == contact.id) {
        contact.remove();
      }
    })
  }
}

async function cardClient(idClient, surnameClient, nameClient, lastnameClient) {
  const id = document.querySelector('.client__info--id');
  const surname = document.querySelector('.client__info--surname');
  const name = document.querySelector('.client__info--name');
  const lastname = document.querySelector('.client__info--lastname');
  location.hash = `${idClient}`;

  id.textContent = `ID: ${idClient}`;
  surname.value = surnameClient;
  name.value = nameClient;
  lastname.value = lastnameClient;

  return {
    id,
    surname,
    name,
    lastname
  }
}

// Работа с блоком контактов
function tableAddImgContact(contacts) {
  const allIcons = document.createElement('td');
  allIcons.classList.add('main__tbody--td')
  let wrapperсontact = document.createElement('div');
  wrapperсontact.classList = 'contacts__image-container';
  allIcons.append(wrapperсontact);
  let i = 0;
  for (const data of contacts) {
    const сontact = document.createElement('div');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    const innerTooltipContacts = document.createElement('div');
    innerTooltipContacts.classList.add('contacts__image--tooltip');
    const link = document.createElement('a');
    const tooltipText = document.createElement('div');
    tooltipText.classList.add('tooltip-text');
    tooltipText.textContent = data.type + ':';
    if (data.type == 'Vk')
      link.setAttribute('href', data.value);
    if (data.type == 'Телефон') link.setAttribute('href', 'tel:' + data.value);
    if (data.type == 'Email')
      link.setAttribute('href', 'mailto:' + data.value);
    if (data.type == 'Facebook')
      link.setAttribute(
        'href',
        'https://www.facebook.com/profile.php?' + data.value
      );
    if (data.type == 'Другое') link.setAttribute('href', data.value);

    link.setAttribute('target', '_blank');
    link.classList.add('tooltip-link');
    tooltip.append(tooltipText, link);
    link.textContent = data.value;
    innerTooltipContacts.append(tooltip, сontact);
    wrapperсontact.append(innerTooltipContacts);
    if (data.type == 'Vk') сontact.classList.add('vk', 'contacts__img');
    if (data.type == 'Телефон') сontact.classList.add('phone', 'contacts__img');
    if (data.type == 'Email') сontact.classList.add('mail', 'contacts__img');
    if (data.type == 'Facebook') сontact.classList.add('fb', 'contacts__img');
    if (data.type == 'Другое') сontact.classList.add('other', 'contacts__img');

    сontact.addEventListener('click', () => {
      const isactive = !tooltip.classList.contains('active');
      document.querySelectorAll('.inner-tooltip-contacts > .tooltip')
        .forEach((tooltip) => {
          tooltip.classList.remove('active');
        });
      if (isactive) {
        tooltip.classList.add('active');
      }
    });
    window.addEventListener('click', (e) => {
      if (e.target !== сontact) {
        tooltip.classList.remove('active');
      }
    });
    i++;
    if (i == 4 && contacts.length > 5) {
      const btn = document.createElement('div');
      btn.classList.add('othersix', 'contacts-img');
      btn.textContent = `+${contacts.length - 4}`;
      wrapperсontact.append(btn);
      wrapperсontact = document.createElement('div');
      wrapperсontact.classList = 'contacts__image-container';
      wrapperсontact.style.display = 'none';

      btn.addEventListener('click', () => {
        btn.style.display = 'none';
        wrapperсontact.style.display = '';
      });
    }
    allIcons.append(wrapperсontact);
  }
  return allIcons;
}

async function renderTable(data) {
  data.forEach(elem => {
    const createdAtDate = new Date(elem.createdAt).toLocaleDateString();
    const dataUpdatedAt = new Date(elem.updatedAt);
    const timeUpdate = dataUpdatedAt.getTime();
    const createdAtTime = new Date(elem.createdAt).toLocaleTimeString().slice(0, -3);
    const updatedAtDate = new Date(elem.updatedAt).toLocaleDateString();
    const updatedAtTime = new Date(elem.updatedAt).toLocaleTimeString().slice(0, -3);

    createClientItem(
      elem.id,
      `${elem.surname} ${elem.name} ${elem.lastName}`,
      `${createdAtDate} <span class="main__tbody--time">${createdAtTime}</span>`,
      `${updatedAtDate} <span class="main__tbody--time">${updatedAtTime}</span>`,
      timeUpdate,
      elem.contacts,
      elem.id,
      elem.id)
  })
}

function error404() {
  errorContainer.style.opacity = '1';
  errorContainer.style.visibility = 'visible';
  errorContainerHeader.textContent = 'Ошибка 404'
  errorContainerSpan.textContent = 'Переданный в запросе метод не существует или запрашиваемый элемент не найден в базе данных';
}

function error500() {
  errorContainer.style.opacity = '1';
  errorContainer.style.visibility = 'visible';
  errorContainerHeader.textContent = 'Ошибка 500'
  errorContainerSpan.textContent = 'Cтранно, но сервер сломался :(';
}

// Создаём клиента из полученных данных сервера
async function getClientApi() {
  dataService.fetchClients().then((response) => {
    const {
      data,
      status
    } = response;

    setTimeout(() => {
      switch (status) {
        case 200:
        case 201:
          renderTable(data);
          modal();
          break;
        case 404:
          error404()
          break;
        case 500:
          error500()
          break;
        case 422:
          for (let error of data.errors) {
            const errorModalContainer = document.querySelector('.error__modal');
            errorModalContainer.textContent = '';
            console.log(error);
            if (error.field == 'surname') {
              errorModalContainer.innerHTML += ` <br>${error.message}  `;
            }
            if (error.field == 'name') {
              errorModalContainer.textContent += `${error.message}  `;
            }
          }
          break;

      }
    }, 1000);
  })
}

getClientApi();


// Создаём блок с добавлением контактов в модальном окне
function contacts(containers) {
  const container = document.querySelector(containers);
  const wrapper = document.createElement('div');
  wrapper.classList.add('contacts');

  const inputContacts = document.createElement('input');
  inputContacts.classList.add('contacts__input');
  inputContacts.placeholder = 'Введите данные контакта';

  const contactsButtonRemove = document.createElement('button');
  contactsButtonRemove.classList.add('contacts__remove');
  contactsButtonRemove.innerHTML = `
	<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/>
	</svg>
	`

  const numberId = Math.floor(Math.random() * 99999);
  const randomdiv = document.createElement('div');
  wrapper.append(randomdiv, inputContacts, contactsButtonRemove);
  wrapper.id = numberId;
  contactsButtonRemove.id = numberId;
  container.prepend(wrapper);
  randomdiv.id = `select-${numberId}`;
  new ItcCustomSelect(`#select-${numberId}`, {
    name: `clients-${numberId}`,
    options: [
      ['email', 'Email'],
      ['phone', 'Телефон'],
      ['vk', 'Vk'],
      ['facebook', 'Facebook'],
      ['other', 'Другое']
    ]
  });

  contactsButtonRemove.addEventListener('click', e => {
    e.preventDefault();
    let targets = e.currentTarget;
    let targetsId = targets.id;
    if (targetsId == wrapper.id) {
      wrapper.remove();
    }
  })

  return wrapper;
}
// Получаем данные контактов с модального окна
function getContacts() {
  const contacts = [];

  const slots = document.querySelectorAll('.contacts');
  for (const slot of slots) {
    const contact = {};
    const select = slot.querySelector('.itc-select__toggle');
    contact.type = select.textContent;
    contact.value = slot.querySelector('input').value;
    contacts.push(contact);
  }
  return contacts;
}
// Получаем ФИО с модального окна
function getInfoClient() {
  const inputSurname = document.querySelector('#surname');
  const inputName = document.querySelector('#name');
  const inputLastName = document.querySelector('#lastname');

  const surnameTransform = editedFullName(inputSurname.value);
  const nameTransform = editedFullName(inputName.value);
  const lastNameTransform = editedFullName(inputLastName.value);

  return {
    surnameTransform,
    nameTransform,
    lastNameTransform,
  }
}
// Вызываем в модальном окне блок с инпутом и селектом (форма добавления контактов)
const modalAddContact = document.querySelector('.modal__contact--button');
modalAddContact.addEventListener('click', e => {
  e.preventDefault();
  contacts('.modal__contact--container');
})

const modalChangeAddContact = document.querySelector('.client__change--contact--button');
modalChangeAddContact.addEventListener('click', e => {
  e.preventDefault();
  contacts('.client__change--contact--container');
})

// Ограничение по добавлению контактов.
const addContacts = document.querySelectorAll('.cntcts');
addContacts.forEach(function (event) {
  event.addEventListener('click', function (e) {
    const btnAddContacts = document.querySelectorAll('.btn-add');
    const contactsWrapper = document.querySelectorAll('.contacts');
    const contactsWrapperError = document.querySelectorAll('.contacts__errors');
    contactsWrapper.forEach(function () {
      if (contactsWrapper.length >= 10) {
        btnAddContacts.forEach(el => {
          el.style.display = 'none';
          contactsWrapperError.forEach(el => {
            el.innerHTML = 'Можно добавить только 10 контактов. &#128532;<br>(Удалите один контакт, чтобы была возможность добавления нового)';
            el.classList.add('active')
          })
        })
      } else {
        btnAddContacts.forEach(el => {
          el.style.display = 'flex';
          contactsWrapperError.forEach(el => {
            el.innerHTML = '';
            el.classList.remove('active');
          })
        })
      }
    })
  })
})

//========================================================================================================================================================
async function addFindErrors(data) {
  const errorModalContainer = document.querySelector('.error__modal');
  errorModalContainer.textContent = '';

  data.then((response) => {
    const {
      data,
      status
    } = response;
    switch (status) {
      case 200:
      case 201:
        renderTable(data)
        break;
      case 404:
        error404()
        break;
      case 500:
        error500()
        break;
      case 422:
        for (let error of data.errors) {
          console.log(error);
          if (error.field == 'surname') {
            errorModalContainer.innerHTML += ` <br>${error.message}  `;
          }
          if (error.field == 'name') {
            errorModalContainer.textContent += `${error.message}  `;
          }
        }
        break;
      default:
        return;
    }
  });
}

function deleteFindErrors(data) {
  data.then((response) => {
    const { status } = response;
    switch (status) {
      case 200:
      case 201:
        renderTable();
        break;
      case 404:
        error404();
        renderTable();
        break;
      case 500:
        error500();
        renderTable();
        break;
      default:
        return;
    }
  });
}

// Создаём обработчик клика и заносим данные на наш сервер.
const buttonAdd = document.querySelector('.modal__button');
buttonAdd.addEventListener('click', async e => {
  let input = getInfoClient();
  let contacts = getContacts();
  const notEmptyContacts = contacts.filter((contact) => contact.value !== '' && contact.type !== 'Выбрать');
  e.preventDefault();

addFindErrors(
  dataService.createClient(
  input.nameTransform,
  input.surnameTransform,
  input.lastNameTransform,
  notEmptyContacts))
})

if (location.hash) {
  const id = location.hash.slice(1);
  const mdl = document.querySelector('.client__info');
  const overlay = document.querySelector('.js-overlay-modal');
  mdl.classList.add('active');
  overlay.classList.add('active')
  dataService.searchClientsId(id).then((response) => {
    const {
      data
    } = response;

    cardClient(data.id, data.surname, data.name, data.lastName)
  })
}


//========================================== СОРТИРОВКА ========================================== //

headers.forEach((header, index) => {
  header.addEventListener('click', () => {
    sortColumn(index);
  });
});

const directions = Array.from(headers).map(() => {
  return '';
});

function transform(index, cell) {
  const type = headers[index].getAttribute('data-name');

  if (type === 'time-creat') {
    return cell.getAttribute('data-create');
  }
  if (type === 'time-update') {
    return cell.getAttribute('data-update');
  }
  if (type === 'id') {
    return cell.getAttribute('data-id');
  }
  if (type === 'contacts') {
    return cell.getAttribute('data-contacts');
  } else {
    return cell.textContent;
  }
}

function sortColumn(index) {
  const rows = tableBody.querySelectorAll('tr');
  const direction = directions[index] || 'desc';
  const multiplier = direction === 'desc' ? -1 : 1;
  const newRows = Array.from(rows);
  newRows.sort((rowA, rowB) => {
    const cellA = rowA.querySelectorAll('td')[index];
    const cellB = rowB.querySelectorAll('td')[index];
    const a = transform(index, cellA);
    const b = transform(index, cellB);
    if (a > b) {
      return 1 * multiplier;
    }
    if (a < b) {
      return -1 * multiplier;
    }
    if (a === b) {
      return 0;
    }
  });
  directions[index] = direction === 'desc' ? 'asc' : 'desc';
  rows.forEach((row) => {
    tableBody.removeChild(row);
  });
  newRows.forEach((newRow) => {
    tableBody.appendChild(newRow);
  });
}

function sortId() {
  const rows = tableBody.querySelectorAll('tr');
  const newRows = Array.from(rows);
  newRows.sort((rowA, rowB) => {
    const cellA = rowA.querySelectorAll('td')[0];
    const cellB = rowB.querySelectorAll('td')[0];
    const a = cellA.getAttribute('data-id');
    const b = cellB.getAttribute('data-id');
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    if (a === b) {
      return 0;
    }
  });
  rows.forEach((row) => {
    tableBody.removeChild(row);
  });

  newRows.forEach((newRow) => {
    tableBody.appendChild(newRow);
  });
}

const thTitleId = document.querySelector('.th-title-id');
thTitleId.addEventListener('click', () => {
  thTitleId.classList.toggle('active');
});

const sortName = document.querySelector('.text');
const thTitleFullName = document.querySelector('.th-title-fio');
thTitleFullName.addEventListener('click', () => {
  thTitleFullName.classList.toggle('active');
  if (sortName.textContent === 'А-Я') {
    sortName.textContent = 'Я-А';
  } else {
    sortName.textContent = 'А-Я'
  }
});

const thTitle = document.querySelectorAll('.th-title');
thTitle.forEach((title) => {
  title.addEventListener('click', () => {
    title.classList.toggle('active');
  });
});

//========================================================================================================================================================
// ПОИСК КЛИЕНТА

const inputSearch = document.querySelector('.header__search');
const inputReq = document.querySelector('.header__request');

inputSearch.addEventListener('keyup', (e) => {
  inputReq.classList.remove('active');
  inputReq.innerHTML = '';
  inputSearch.innerHTML = '';
  e.preventDefault();

  if (inputSearch.value) {

    dataService.searchAutoFill(inputSearch.value).then((response) => {
      const data = response;
      if (data.length > 0) {
        inputReq.classList.add('active');
        for (const contact of data) {
          const searchLines = document.createElement('div');
          searchLines.classList.add('header__lines');
          inputReq.append(searchLines);
          searchLines.innerHTML = `<span style="color: #cacaca;">ID: ${contact.id}</span> \u2013 ${contact.surname} ${contact.name} ${contact.lastName}`;
          searchLines.addEventListener('click', () => {
            const rows = tableBody.querySelectorAll('tr');
            const newRows = Array.from(rows);
            newRows.forEach((row) => {
              row.classList.remove('sublight');
              if (row.getAttribute('data-tr') == contact.id) {
                row.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
                row.classList.add('sublight');
                inputReq.classList.remove('active');
              }
            });
          });
          window.addEventListener('click', (e) => {
            if (e.target !== inputReq) {
              inputSearch.value = '';
              inputReq.classList.remove('active');
            }
          });
        }
      }
    })
  }
})

document.addEventListener('click', function () {
  const modals = document.querySelector('.modal');
  const modalActive = modals.classList.contains('active')

  if (modalActive) {
    const contactValidate = document.querySelectorAll('.contacts');
    contactValidate.forEach(el => {
      el.addEventListener('click', function () {
        const buttonSelect = el.querySelector('button').value;
        const inputSelect = el.querySelector('input');

        if (buttonSelect === 'phone') {
          inputSelect.setAttribute('maxLength', 12)
          inputSelect.type = 'text'
          inputSelect.value = '+7'
        } else {
          inputSelect.removeAttribute('maxLength')
        }

        if (buttonSelect === 'vk') {
          inputSelect.type = 'text';
          inputSelect.value = 'https://vk.com/'
        }

        if (buttonSelect === 'facebook') {
          inputSelect.type = 'text';
          inputSelect.value = 'https://facebook.com/'
        }

        if (buttonSelect === 'email') {
          inputSelect.value = ''
        }
      })
    })
  }
})
