import axios from 'axios'
import BASE_URL from '../consts'

class MyDate {
    constructor(year, month, date) {
        this._date = new Date(year, month-1, date)
    }

    getYear() { return this._date.getFullYear() }
    getMonth() { return this._date.getMonth()+1 }
    getDate() { return this._date.getDate() }
    getDay() { return this._date.getDay() }

    setYear(year) { return this._date.setFullYear(year) }
    setMonth(month) { return this._date.setMonth(month-1) }
    setDate(date) { return this._date.setDate(date) }

    toString() { return `${this.getYear()}-${this.getMonth()}-${this.getDate()}` }


    _add_one_day() {
        let year = this.getYear()
        let month = this.getMonth()
        let date = this.getDate()

        let is_leap = (year % 100 != 0 && year % 4 == 0) || (year % 400 == 0)
        let s_month = [2, 4, 6, 9, 11]

        let end_of_month
        for (let m of s_month) {
            if (month == m) {
                if (is_leap == true) {
                    if (month == 2) {
                        end_of_month = 29
                        break
                    } else {
                        end_of_month = 30
                        break
                    }
                } else {
                    if (month == 2) {
                        end_of_month = 28
                        break
                    } else {
                        end_of_month = 30
                        break
                    }
                }
            }
        }
        end_of_month = end_of_month == undefined ? 31 : end_of_month

        if (date+1 > end_of_month) {
            if (month == 12) {
                this.setDate(1)
                this.setMonth(1)
                this.setYear(year+1)
            } else {
                this.setDate(1)
                this.setMonth(month+1)
            }
        } else {
            this.setDate(date+1)
        }
    }

    add(num_of_date) {
        for(let i = 0; i < num_of_date; i++) {
            this._add_one_day()
        }
    }

    is_equal(date) {
        return this.toString() === date.toString()
    }

    is_greater(date) {
        if (this.getYear() > date.getYear()) return 1
        else if (this.getYear() == date.getYear()) {
            if (this.getMonth() > date.getMonth()) return 1
            else if (this.getMonth() == date.getMonth()) {
                if (this.getDate() > date.getDate()) return 1
                else if (this.getDate() == date.getDate()) return 0
                return -1
            }
            return -1
        }
        return -1
    }

    delta(date) {
        let sign = this.is_greater(date)
        let subtractor = sign > 0 ? date : this
        let minuend = sign > 0 ? this : date
        let counter = 0
        while (!subtractor.is_equal(minuend)) {
            counter++
            subtractor.add(1)
        }
        return sign * counter
    }

    copy() {
        let year = this.getYear()
        let month = this.getMonth()
        let date = this.getDate()
        return new MyDate(year, month, date)
    }
}

class Coordinate2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    moveDown(px) { this.y += px }
    moveRight(px) { this.x += px }
}

//colors
const WHITE = "#FFFFFF";
const LIGHT_PURPLE = "#d7c8ff"
const PURPLE = "#b17aff"
const HEAVY_PURPLE = "#731eea"
const DARK_PURPLE = "#441b7f"
const BACKGROUND_COLOR = "#E6E6FA"

//standards
const UPPER_LIMIT = 25
const LOWER_LIMIT = 5
const LEVEL = (UPPER_LIMIT - LOWER_LIMIT) / 4

 //constants of length
const winWidth = window.innerWidth
const winHeight = window.innerHeight
const SQUARE_LENGTH = winWidth / 82
const GAP_LENGTH = winHeight / 150
const STEP = SQUARE_LENGTH + GAP_LENGTH
const EDGE_LENGTH = SQUARE_LENGTH + GAP_LENGTH
const CANVAS_WIDTH = 53 * SQUARE_LENGTH + 52 * GAP_LENGTH + 2 * EDGE_LENGTH
const CANVAS_HEIGHT = 7 * SQUARE_LENGTH + 6 * GAP_LENGTH + 2 * EDGE_LENGTH

const colorMap = [
    {score: LOWER_LIMIT, color: WHITE},
    {score: LOWER_LIMIT + LEVEL * 1, color: LIGHT_PURPLE},
    {score: LOWER_LIMIT + LEVEL * 2, color: PURPLE},
    {score: LOWER_LIMIT + LEVEL * 3, color: HEAVY_PURPLE},
    {score: UPPER_LIMIT, color: DARK_PURPLE},
]
const TODAY = new Date()
const FIRST_DAY = new MyDate(TODAY.getFullYear(), 1, 1)
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class Square {
    constructor(date_, score) {
        this.date = date_
        this.score = score
        this.square_length = SQUARE_LENGTH
        this.gap_length = GAP_LENGTH
        this.step = STEP
        this.origin = new Coordinate2D(1.5*EDGE_LENGTH, EDGE_LENGTH)
        this.coordinate = this.getSpot()
    }

    resize(width, height) {
        this.square_length = width / 82
        this.gap_length = height / 150
        this.step = this.square_length + this.gap_length
        this.origin = new Coordinate2D(1.5*this.step, this.step)
        this.coordinate = this.getSpot()
    }

    getColor() {
        let i = 0
        while (i < colorMap.length) {
            if (this.score < colorMap[i].score) return colorMap[i].color
            i++
        }
        return colorMap[i-1].color
    }

    getSpot() {
        let week = Math.floor(this.date.delta(new MyDate(this.date.getYear(), 1, 1)) / 7)
        let day = this.date.delta(new MyDate(this.date.getYear(), 1, 1)) % 7
        let coordinate = new Coordinate2D(this.origin.x, this.origin.y)
        coordinate.moveDown(day*this.step)
        coordinate.moveRight(week*this.step)
        return coordinate
    }

    draw(context) {
        context.fillStyle = this.getColor()
        context.fillRect(this.coordinate.x,
                         this.coordinate.y,
                         this.square_length,
                         this.square_length)
    }
}

class Activity {
    constructor(canvas_id, table) {
        this.canvas = document.getElementById(canvas_id)
        this.canvas.width = CANVAS_WIDTH
        this.canvas.height = CANVAS_HEIGHT
        this.square_length = SQUARE_LENGTH
        this.gap_length = GAP_LENGTH
        this.edge_length = EDGE_LENGTH
        this.context = this.canvas.getContext('2d')
        this.table = table

        this.drawBackground()
    }

    resize(width, height) {
        this.square_length = width / 82
        this.gap_length = height / 150
        this.edge_length = this.square_length + this.gap_length
        this.canvas.width = 53 * this.square_length + 52 * this.gap_length + 2 * this.edge_length
        this.canvas.height = 7 * this.square_length + 6 * this.gap_length + 2 * this.edge_length
        this.drawBackground()
        this.draw()
    }

    drawBackground() {
        this.context.fillStyle = BACKGROUND_COLOR
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = "#000000"
        this.context.font = "12px serif"
        let Days = []
        for (let j = FIRST_DAY.getDay(); j < FIRST_DAY.getDay() + 7; j++) {
            Days.push(WEEKDAYS[(j-1)%7])
        }
        for (let i = 0; i < 7;  i++) {
            this.context.fillText(Days[i], this.edge_length/2, (i+0.8)*this.square_length + i*this.gap_length + this.edge_length)
        }
        for (let m = 0; m < 12; m++) {
            this.context.fillText(Months[m], ((2*m+1)*((this.canvas.width-2*this.edge_length)/24) + this.edge_length), this.edge_length/2)
        }
        this.context.fillText(TODAY.getFullYear(), this.canvas.width/2, this.canvas.height)
    }

    draw() {
        for (let square of this.table) {
            square.draw(this.context)
        } 
    }

    static async getActivity(user_id) {
        let res = await axios.get(BASE_URL + `user/getactivitytable/${user_id}/`)
        let scores_list = res.data

        for (let i in scores_list) {
            let [year, month, date] = scores_list[i].date.split("-")
            scores_list[i].date = new MyDate(year, month, date)
        }
        
        let this_year = new Date().getFullYear()
        let start = new MyDate(this_year, 1, 1)
        let end = new MyDate(this_year+1, 1, 1)

        let table = []

        while(!start.is_equal(end)) {
            for (let i in scores_list) {
                if (start.is_equal(scores_list[i].date)) {
                    table.push(new Square(scores_list[i].date, scores_list[i].score))
                    start.add(1)
                    continue
                }
            }
            table.push(new Square(start.copy(), 0))
            start.add(1)
        }
        return table
    }
}

export default Activity