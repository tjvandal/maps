import { Box, IconButton } from 'theme-ui'
import { useRecenterRegion } from '@carbonplan/maps'
import { XCircle } from '@carbonplan/icons'

const AverageDisplay = ({ data: { loading, value } }) => {
  if (loading) {
    return 'loading...'
  }

  if (!value.temperature) {
    throw new Error('Value not present')
  }

  let concatenated = []
  value.coordinates.month.forEach((k) => {
    concatenated.push(value.temperature[k])
  })
  concatenated = concatenated.flat()

  const filteredData = concatenated.filter((d) => d !== -3.3999999521443642e38)
  if (filteredData.length === 0) {
    return 'no data available'
  } else {
    const average =
      filteredData.reduce((a, b) => a + b, 0) / filteredData.length
    return (
      <Box
        sx={{
          ml: [2],
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
        }}
      >{`Average: ${average.toFixed(2)}ºC`}</Box>
    )
  }
}

const RegionControls = ({
  regionData,
  showRegionPicker,
  setShowRegionPicker,
}) => {
  const { recenterRegion } = useRecenterRegion()

  return (
    <Box
      sx={{
        display: ['none', 'none', 'flex', 'flex'],
        alignItems: 'center',
        position: 'absolute',
        color: 'primary',
        left: [13],
        bottom: [17, 17, 15, 15],
      }}
    >
      <IconButton
        aria-label='Circle filter'
        onClick={() => setShowRegionPicker(!showRegionPicker)}
        sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
      >
        {!showRegionPicker && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='34'
            height='34'
            strokeWidth='1.75'
            fill='none'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='10' cy='10' r='3' />
            <line x1='12' x2='17' y1='12' y2='17' />
          </svg>
        )}
        {showRegionPicker && (
          <XCircle sx={{ strokeWidth: 1.75, width: 24, height: 24 }} />
        )}
      </IconButton>
      {showRegionPicker && (
        <IconButton
          aria-label='Recenter map'
          onClick={recenterRegion}
          sx={{ stroke: 'primary', cursor: 'pointer', width: 34, height: 34 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='34'
            height='34'
            strokeWidth='1.75'
            fill='none'
          >
            <circle cx='12' cy='12' r='10' />
            <circle cx='12' cy='12' r='2' />
          </svg>
        </IconButton>
      )}
      {showRegionPicker && <AverageDisplay data={regionData} />}
    </Box>
  )
}

export default RegionControls