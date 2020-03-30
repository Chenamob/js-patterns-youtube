class Complaints {
  constructor() {
      if (Complaints.exist) return Complaints.instance;
      this.complaints = []
      Complaints.exist = true
      Complaints.instance = this
  }

  reply(complaint) { }

  add(complaint) {
      this.complaints.push(complaint)
      console.log(" length = " + this.complaints.length);
      return this.reply(complaint)
  }
  print() {
      console.log("Complaints List:\n" + JSON.stringify(this.complaints))
  }
}

class ProductComplaints extends Complaints {
  reply({ id, customer, details }) {
      return `Product: ${id}: ${customer} (${details})`
  }
}

class ServiceComplaints extends Complaints {
  reply({ id, customer, details }) {
      return `Service: ${id}: ${customer} (${details})`
  }
}

class ComplaintRegistry {

  register(customer, type, details) {
      const id = Date.now()
      let complaint

      if (type === 'service') {
          complaint = new ServiceComplaints()
      } else {
          complaint = new ProductComplaints()
      }

      this.last = complaint;
      return complaint.add({ id, customer, details })
  }

  printall() {
      this.last.print();
  }
}

const registry = new ComplaintRegistry()

console.log(registry.register('Vladilen', 'service', 'недоступен'))
console.log(registry.register('Elena', 'product', 'вылазит ошибка'))
console.log(registry.register('Elsfdena', 'product', 'вылазит ошибка2'))

console.log(registry.register('Elsfgfdena', 'product', 'вылазит ошибкаdfd2'))
registry.printall();