export function formatDate(dateString) {
  const date = new Date(dateString)
  const days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
}
