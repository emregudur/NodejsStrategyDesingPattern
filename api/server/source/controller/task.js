import Tasks from '../models/tasks'

export async function Get(req, res, next) {
  const users = [
    {name: 'Developer 1', level: 1, tasks: []},
    {name: 'Developer 2', level: 2, tasks: []},
    {name: 'Developer 3', level: 3, tasks: []},
    {name: 'Developer 4', level: 4, tasks: []},
    {name: 'Developer 5', level: 5, tasks: []},
  ];

  const dailyCapacity = 9;

  Tasks.find({})
    .then(tasks => {
      tasks = tasks.map(x => ({taskId: x.taskId, duration: parseInt(x.duration), level: parseInt(x.level)}))
      let newUsers = users.map(user => {
        let levelTasks = tasks.filter(task => task.level === user.level)
        let maxDuration = 0
        levelTasks.forEach(x => maxDuration += x.duration)
        var userTasks = []
        var day = 0
        var data
        var needHour = 9

        // algoritma günlük olarak 9 saatlik iş yapabilme süresini baz alıyor
        // gelen task bir günden fazla ise 9 saatlik kısmı alınıp geri kalanı listeye geri ekleniyor
        // liste FIFO şeklikte tüketildiği için tasklar ertesi güne tekrar ekleniyor
        while (data = levelTasks.pop()) {
          if (needHour < 1) {
              needHour = 9
          }
          if (data.duration > needHour) {
            levelTasks.push({...data, duration: data.duration - needHour }) // ihtiyaç fazlası tekrar listeye alınıyor
            userTasks.push({...data, duration: needHour, maxDayCount}) // task user'a ekleniyor
            needHour = data.duration - needHour // günü tamamlamak için ihtiyaç olan task süresi hesaplanıyor
          } else if (data.duration < needHour) {
            // eğer gelen task süresi günü tamamlamak için gereken süreden düşük ise direk user tasklarına aktarılıyor
            userTasks.push({...data, duration: data.duration, day})
            needHour = needHour - data.duration // günü tamamlamak için ihtiyaç olan task süresi hesaplanıyor
          } else {
            // gelen task süresi ve ihtiyaç olan task süresi eşit olduğu durum
            userTasks.push({...data, duration: needHour, day})
            needHour = dailyCapacity - needHour // günü tamamlamak için ihtiyaç olan task süresi hesaplanıyor
          }

          // günü tamamlamak için o günün task süresinin 9 olup olmadığı kontrol ediliyor
          var maxDayCount = 0
          userTasks.filter(x => {
            if (x.day === day) maxDayCount += x.duration
          })

          if (maxDayCount > 8) {
            day++
            needHour = 9
          }
        }

        return {...user, tasks: userTasks}
      })

      let json = JSON.stringify(newUsers)
      res.send(json)
    })
    .catch(console.log)
}

export async function AddProvider(req, res, next) {
  let json = JSON.stringify({ 'test': true })
  res.send(json)
}
