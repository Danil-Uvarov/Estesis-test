import { defineStore } from 'pinia'
import { INote } from '@/models/entyties/INote.ts'

interface notesState {
  notesList: INote[]
}

export const useNotesStore = defineStore('notes', {
  state: (): notesState => ({
    notesList: [],
  }),
  actions: {
    setLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.notesList))
    },
  },
})
