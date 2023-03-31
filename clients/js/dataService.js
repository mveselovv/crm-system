export class DataService {

  async searchAutoFill(sign) {
    const response = await fetch(
      `http://localhost:3000/api/clients?search=${sign}`
    );
    const data = await response.json();
    return data
  }

  async fetchClients() {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  }

  async searchClientsId(id) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`);
    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  }

  async changeClient(id, name, surname, lastname, contacts) {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        surname: surname,
        lastName: lastname,
        contacts,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return {
      data,
      status: response.status,
    };
  }

  async deleteClient(id) {
    const data = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    });
    return {
      status: data.status
    };
  }

  async createClient(name, surname, lastname, contacts) {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        surname: surname,
        lastName: lastname,
        contacts,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();


    return {
      data,
      status: response.status,
    };
  }
}
