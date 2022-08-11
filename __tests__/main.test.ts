import {convertToFullPath, parseYamlString, readYamlFile} from '../src/utils'
import {increaseBuildNumber} from '../src/main'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

function createChildProcess(currentWorkingDirectory: string) {
  process.env['INPUT_INCREASE-BUILD-NUMBER'] = 'true'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env,
    cwd: currentWorkingDirectory
  }
  return cp.execFileSync(np, [ip], options).toString()
}
test('test runs correctly', () => {
  const result = createChildProcess('./__tests__/static/')
  expect(result).toEqual(
    expect.stringContaining('::set-env name=NEW_VERSION::32.21.43+')
  )
})
test('test runs correctly', () => {
  expect(() => createChildProcess('fake')).toThrow()
})

test('e2e typescript test', () => {
  increaseBuildNumber('./__tests__/static/')
})
