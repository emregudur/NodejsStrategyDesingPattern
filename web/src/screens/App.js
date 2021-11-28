import React from 'react'
import { 
  ChakraProvider, 
  Container, 
  Box, 
  Text, 
  Heading, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion';

import EyeIcon from '../components/eye-icon';
import Section from '../components/section';

import theme from '../lib/theme'

import TasksDetail from '../components/tasks-detail';
import { Spinner } from '../components/spinner';


function App() {
  const [showDetail, setShowDetail] = React.useState(false)
  const [detailData, setDetailData] = React.useState({user: '', tasks: []})
  const [tasks, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/task')
      .then(res => res?.json())
      .then(data => {
        setTasks(data)
        setLoading(false)
      })
      .catch(err => setLoading(false))
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence exitBeforeEnter initial={true}>
        <Container maxW='container.lg'>
          <Box>
            <Section delay={0.2}>
              <Heading mt='10' textAlign='center' as='h2' variant='page-title'>
                NodeJS Strategy Design Pattern To-Do Planning
              </Heading>
            </Section>
            <Section delay={0.4}>
              <Text textAlign='center'>
                Reprehenderit sunt elit est proident dolore pariatur Lorem velit incididunt magna. Commodo culpa amet officia magna sunt do laboris aliqua exercitation. Irure amet excepteur labore cillum esse quis exercitation.
              </Text>
            </Section>
            <Section delay={0.6}>
              <Table mt='10' variant='simple'>
                <Thead>
                  <Tr>
                    <Th>User Name</Th>
                    <Th>Level</Th>
                    <Th>Total Tasks</Th>
                    <Th>Total Day</Th>
                    <Th>Total Week</Th>
                    <Th>Schedule</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loading && <Spinner/>}
                  {tasks.map(user => {
                    return (
                      <Tr>
                        <Td>{user.name}</Td>
                        <Td>{user.level}</Td>
                        <Td>{user.tasks.length}</Td>
                        <Td>{user.tasks[user.tasks.length -1].day}</Td>
                        <Td>{Math.ceil(user.tasks[user.tasks.length -1].day / 7)}</Td>
                        <Td cursor='pointer' onClick={() => {
                          setDetailData({user: user.name, tasks: user.tasks})
                          setShowDetail(true)
                        }}><EyeIcon/></Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </Section>

            {
              showDetail && 
              <Box mb='20'>
                <Heading mt='10' textAlign='center' as='h2' variant='page-title'>
                  {detailData.user}
                </Heading>
                <Divider my='10'/>
                <TasksDetail data={detailData}/>
              </Box>
            }
          </Box>
        </Container>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
