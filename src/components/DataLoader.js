import React from 'react'
import Button from 'muicss/lib/react/button'
import Header from './Header'

export default props => (
  <div>
    <Header title='Import Data'/>
    <Button
      variant='raised'
      color='primary'
      size='small'
      onClick={() => {
        props.getRandomData()
      }}
    >
      Randomize
    </Button>
    <Button
      variant='raised'
      color='primary'
      size='small'
      onClick={() => {
        document.getElementById('filePicker').click()
      }}
    >
      Load CSV
    </Button>
    <input
      id='filePicker'
      type='file'
      accept='.csv'
      style={{
        display: 'none',
      }}
      onChange={e => {
        if (e.target.files.length === 1) {
          let Reader = new FileReader()
          Reader.onload = e => {
            try {
              let rows = Reader.result.split(/\r?\n|\r/)
              let headers = []
              let data = []
              for (let i = 0; i < rows.length; i++) {
                let row = rows[i].split(',')
                let datum = []
                for (let j = 0; j < row.length; j++) {
                  if (i === 0) {
                    // assume first row is headers
                    headers.push(row[j])
                  }
                  else {
                    // assume all other rows are numerical data
                    datum.push(parseFloat(row[j].replace(/"/g,'')))
                  }
                }
                if (i > 0) {
                  data.push(datum)
                }
              }
              props.loadData(headers, data)
            }
            catch(e) {
              window.alert('Unable to read file! ' + e.toString())
            }
          }
          Reader.readAsText(e.target.files[0])
        }
      }}
    />
  </div>
)
