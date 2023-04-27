import localforage from 'localforage'
import { type Task } from '../types/types'

type TimeVariants = 'start' | 'work'

const keys = {
  tasks: 'tasks',
  issue: 'issue',
  estimation: 'estimation',
  startTime: 'startTimeForTimer',
  workTime: 'workTimeForTimer',
}

const MIN_VALID_FIELDS = 1
const timeKeyMap = {
  start: keys.startTime,
  work: keys.workTime,
}

async function setDescription(description: string) {
  try {
    return await localforage.setItem(keys.issue, description)
  } catch (err) {
    console.error(err)
  }
}

async function getDescription() {
  try {
    const value = await localforage.getItem(keys.issue)
    return value as string
  } catch (err) {
    console.error(err)
  }
}

async function setTime(variant: TimeVariants, timeInMs: number) {
  try {
    return await localforage.setItem(timeKeyMap[variant], timeInMs)
  } catch (err) {
    console.error(err)
  }
}

async function getTime(variant: TimeVariants) {
  try {
    const value = await localforage.getItem(timeKeyMap[variant])
    return value as number
  } catch (err) {
    console.error(err)
  }
}

async function removeTime(variant: TimeVariants) {
  try {
    return await localforage.removeItem(timeKeyMap[variant])
  } catch (err) {
    console.error(err)
  }
}

async function setTasks(tasks: Task[]) {
  try {
    return await localforage.setItem(keys.tasks, tasks)
  } catch (err) {
    console.error(err)
  }
}

async function getTasks() {
  try {
    const value = await localforage.getItem(keys.tasks)
    return value as Task[]
  } catch (err) {
    console.error(err)
  }
}

async function setEstimation(interval: number) {
  try {
    return await localforage.setItem(keys.estimation, interval)
  } catch (err) {
    console.error(err)
  }
}

async function getEstimation() {
  try {
    const value = await localforage.getItem(keys.estimation)

    return value as number
  } catch (err) {
    console.error(err)
  }
}

async function hasDescription() {
  try {
    const value = await localforage.getItem(keys.issue)

    return !!value
  } catch (err) {
    console.error(err)
  }
}

async function hasEntries() {
  try {
    const length = await localforage.length()

    return length >= MIN_VALID_FIELDS
  } catch (err) {
    console.error(err)
  }
}

function resetAll() {
  localforage.clear()
}

const service = {
  getDescription,
  setDescription,
  setTasks,
  getTasks,
  setEstimation,
  getEstimation,
  setTime,
  getTime,
  removeTime,
  resetAll,
  hasEntries,
  hasDescription,
}

export default service
