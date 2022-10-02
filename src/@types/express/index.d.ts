import express from 'express'
import { User } from '../../entities'

declare module 'express' {
  interface Request extends express.Request {
    user: User | null
  }
}
