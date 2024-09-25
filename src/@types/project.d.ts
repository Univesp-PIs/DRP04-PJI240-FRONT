export interface IResponseListProjects {
  id: number
  name: string
  current_status: {
    id: string
    name: string
  }
  email: string
  access_key: string
}

export interface IResponseGetProject {
  email: string
  current_status_id: number
  project_name: string
  timelime: {
    id: number
    rank: number
    name: string
    last_update: string
    status: string
  }[]
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
