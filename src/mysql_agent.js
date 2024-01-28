import mysql from 'mysql2'
import {log} from './log_agent'

export function do_build_connections(connections_info) {
  const connections = []
  for(const connection_info of connections_info) {
    const connection = do_build_connection(connection_info)
    connections.push({
      name: connection_info.name,
      connection,
    })
  }
  return connections
}

export function do_build_connection(connection_info) {
  const {name, host, port, user, password, database,} = connection_info
  "Connecting mysql " + name |> log(#)
  const connection = mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  })
  connection.connect(error => {
    if(error) {
      "Cannot connecting mysql " + name |> log(#)
      error |> log(#)
    } else {
      "Connected mysql " + name |> log(#)
    }
    
  })
  return connection
}

export function do_query(connection, sql, onSuccess, onError) {
  connection.query(sql, (error, results, fields) => {
    if(error) {
      onError(error)
    } else {
      onSuccess(results)
    }
  })
}