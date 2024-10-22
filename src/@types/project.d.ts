type IProject = {
  id: number
  name: string
  key: string
}

type IClient = {
  id: number
  name: string
  email: string
}

type ITimeline = {
  ranking: {
    id: number
    rank: number
    last_update: string
    condition: {
      id: number
      name: string
    }
  }
}

export interface IResponseListProjects {
  project: IProject
  client: IClient
}

export interface IResponseGetProject extends IResponseListProjects {
  timeline: ITimeline[]
}

export interface ICreateProject {
  email: string
  project_name: string
  timelime: {
    id: number
    rank: number
    name: string
  }[]
}

export type IUpdateProject = IResponseGetProject
